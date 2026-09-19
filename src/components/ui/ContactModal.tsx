"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import ContactForm, { type ProjectType } from "./ContactForm";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectType?: ProjectType;
}

export default function ContactModal({
  isOpen,
  onClose,
  projectType,
}: ContactModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const panel = dialog.current;
    if (!panel || !isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    panel.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      panel.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialog}
      className="contact-dialog"
      aria-labelledby="contact-dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      data-lenis-prevent
    >
      <div className="dialog-header">
        <h2 id="contact-dialog-title">Let&apos;s make something useful.</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close contact form"
          autoFocus
        >
          <X size={22} />
        </button>
      </div>
      <div className="dialog-body">
        <p>
          Share your idea, current site, or the workflow you want to improve.
          I&apos;ll come back with a clear next step.
        </p>
        {isOpen && (
          <ContactForm onSuccess={onClose} initialProjectType={projectType} />
        )}
      </div>
    </dialog>
  );
}
