"use client";

import dynamic from "next/dynamic";
import {
  Component,
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
  type ReactNode,
} from "react";
import { useInView } from "framer-motion";
import BrandMarkRelief from "./BrandMarkRelief";

const BrandMarkScene = dynamic(() => import("../canvas/BrandMarkScene"), {
  ssr: false,
  loading: () => <BrandMarkRelief />,
});

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const getMotionPreference = () => window.matchMedia(motionQuery).matches;
const getServerMotionPreference = () => true;

function supportsWebGL() {
  if (typeof document === "undefined") return false;
  try {
    const context = document.createElement("canvas").getContext("webgl2");
    if (!context) return false;
    context.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

class GraphicsFallback extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <BrandMarkRelief /> : this.props.children;
  }
}

export default function SculptedBrandMark() {
  const ref = useRef<HTMLDivElement>(null);
  const [supports3d] = useState(supportsWebGL);
  const visible = useInView(ref, { margin: "120px" });
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    getMotionPreference,
    getServerMotionPreference,
  );
  const [pointer, setPointer] = useState<[number, number]>([0, 0]);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer([
      (event.clientX - rect.left) / rect.width - 0.5,
      (event.clientY - rect.top) / rect.height - 0.5,
    ]);
  };
  return (
    <div
      ref={ref}
      className="about-mark-sculpture"
      aria-hidden="true"
      onPointerMove={move}
      onPointerLeave={() => setPointer([0, 0])}
    >
      <GraphicsFallback>
        {visible && supports3d ? (
          <BrandMarkScene pointer={pointer} reducedMotion={reducedMotion} />
        ) : (
          <BrandMarkRelief />
        )}
      </GraphicsFallback>
    </div>
  );
}
