"use client";

/**
 * TorontoSkyline -- decorative silhouette band sitting above the Footer.
 *
 * Architecture details added in this revision so buildings read less as flat
 * bricks and more as actual structures:
 *   - Rooftop HVAC / equipment boxes on flat-topped buildings
 *   - More antennae spires + the odd pointed crown
 *   - Setback / stepped silhouettes on a few towers
 *   - Subtle vertical "edge highlight" strip on larger glass facades
 *     (1px lighter band suggesting moonlit corner)
 *
 * Border-t removed from the wrapper -- the hairline across the skyline top was
 * visible directly above CN Tower's antenna.
 */

const windowLights: Array<{ x: number; y: number; dur: number; begin: number }> = [
    { x: 146, y: 218, dur: 8.0, begin: -1.2 },
    { x: 218, y: 200, dur: 6.5, begin: -3.7 },
    { x: 252, y: 222, dur: 7.4, begin: -0.6 },
    { x: 284, y: 190, dur: 9.0, begin: -4.9 },
    { x: 312, y: 218, dur: 7.0, begin: -2.3 },
    { x: 348, y: 158, dur: 8.5, begin: -2.1 },
    { x: 376, y: 180, dur: 6.0, begin: -4.8 },
    { x: 384, y: 144, dur: 10.0, begin: -1.5 },
    { x: 414, y: 162, dur: 7.5, begin: -3.2 },
    { x: 442, y: 130, dur: 9.5, begin: -6.0 },
    { x: 452, y: 172, dur: 6.8, begin: -0.8 },
    { x: 442, y: 206, dur: 8.0, begin: -4.4 },
    { x: 472, y: 150, dur: 7.2, begin: -1.9 },
    { x: 504, y: 142, dur: 8.7, begin: -5.6 },
    { x: 512, y: 200, dur: 6.3, begin: -3.0 },
    { x: 536, y: 100, dur: 7.0, begin: -1.0 },
    { x: 546, y: 100, dur: 9.0, begin: -3.4 },
    { x: 556, y: 100, dur: 6.5, begin: -5.8 },
    { x: 564, y: 100, dur: 8.0, begin: -2.2 },
    { x: 540, y: 130, dur: 7.5, begin: -4.1 },
    { x: 558, y: 130, dur: 9.5, begin: -0.7 },
    { x: 546, y: 162, dur: 6.8, begin: -3.6 },
    { x: 562, y: 162, dur: 8.4, begin: -5.2 },
    { x: 538, y: 198, dur: 7.2, begin: -1.8 },
    { x: 554, y: 198, dur: 9.0, begin: -4.7 },
    { x: 608, y: 134, dur: 8.0, begin: -2.8 },
    { x: 618, y: 174, dur: 6.5, begin: -5.3 },
    { x: 644, y: 172, dur: 7.8, begin: -0.4 },
    { x: 678, y: 190, dur: 9.0, begin: -3.8 },
    { x: 932, y: 180, dur: 6.5, begin: -1.4 },
    { x: 1004, y: 172, dur: 8.5, begin: -4.0 },
    { x: 1036, y: 138, dur: 7.0, begin: -2.5 },
    { x: 1042, y: 168, dur: 9.5, begin: -6.2 },
    { x: 1050, y: 198, dur: 6.8, begin: -3.3 },
    { x: 1068, y: 180, dur: 8.2, begin: -1.0 },
    { x: 1094, y: 156, dur: 7.5, begin: -4.5 },
    { x: 1102, y: 188, dur: 9.0, begin: -2.0 },
    { x: 1128, y: 198, dur: 6.5, begin: -5.7 },
];

export default function TorontoSkyline() {
    return (
        <div
            className="relative w-full overflow-hidden"
            aria-hidden="true"
        >
            <div className="absolute left-1/2 top-5 z-10 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap">
                <span className="h-px w-12 bg-[#34E5FF]/40" />
                <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#34E5FF]">
                    Toronto · ON
                </span>
                <span className="h-px w-12 bg-[#34E5FF]/40" />
            </div>

            <svg
                viewBox="0 0 1200 260"
                preserveAspectRatio="xMidYMax slice"
                className="block h-[210px] w-full md:h-[260px]"
            >
                {/* Star field (two layers for depth) */}
                <g fill="#34E5FF" opacity="0.5">
                    <circle cx="110" cy="60" r="0.8" />
                    <circle cx="245" cy="42" r="0.6" />
                    <circle cx="365" cy="70" r="0.7" />
                    <circle cx="510" cy="48" r="0.6" />
                    <circle cx="640" cy="80" r="0.7" />
                    <circle cx="855" cy="55" r="0.8" />
                    <circle cx="1010" cy="70" r="0.6" />
                    <circle cx="1140" cy="45" r="0.7" />
                </g>
                <g fill="#CBD2D9" opacity="0.22">
                    <circle cx="80" cy="28" r="0.4" />
                    <circle cx="295" cy="22" r="0.4" />
                    <circle cx="540" cy="26" r="0.5" />
                    <circle cx="755" cy="18" r="0.4" />
                    <circle cx="980" cy="30" r="0.4" />
                    <circle cx="1180" cy="22" r="0.5" />
                </g>

                {/* === Buildings (silhouette) ===
                    Mix of plain rectangles, stepped/setback polygons, and a few
                    with pointed crowns so the skyline reads as architecture
                    rather than a row of dominoes. */}
                <g fill="#15171B">
                    {/* East end / distillery row */}
                    <rect x="0"   y="218" width="38" height="42" />
                    <rect x="38"  y="206" width="32" height="54" />
                    <rect x="70"  y="194" width="40" height="66" />
                    <rect x="110" y="208" width="28" height="52" />

                    {/* Mid-rise cluster (setback stepped on second) */}
                    <rect x="142" y="186" width="32" height="74" />
                    <polygon points="174,260 174,168 198,168 198,178 206,178 206,260" />
                    <rect x="210" y="174" width="28" height="86" />
                    <rect x="240" y="190" width="34" height="70" />
                    {/* Tall slab with setback */}
                    <polygon points="276,260 276,158 302,158 302,176 290,176 290,196 302,196 302,260" />
                    <rect x="304" y="178" width="30" height="82" />

                    {/* TD / Bay st financial cluster */}
                    <rect x="338" y="138" width="28" height="122" />
                    <rect x="368" y="120" width="34" height="140" />
                    <rect x="404" y="148" width="26" height="112" />
                    {/* Tallest TD — setback pyramid crown */}
                    <polygon points="432,260 432,105 442,105 442,92 452,92 452,105 462,105 462,260" />
                    <rect x="464" y="132" width="28" height="128" />
                    <rect x="494" y="118" width="32" height="142" />

                    {/* First Canadian Place flagship + adjacent */}
                    <rect x="528" y="78"  width="42" height="182" />
                    <rect x="572" y="124" width="26" height="136" />
                    {/* Royal Bank style — pyramidal crown */}
                    <polygon points="600,260 600,108 617,84 634,108 634,260" />
                    <rect x="636" y="138" width="28" height="122" />
                    <rect x="666" y="156" width="32" height="104" />
                    <rect x="700" y="174" width="26" height="86" />

                    {/* Rogers Centre -- cylindrical drum + flatter retractable dome.
                        Real proportions are ~205m wide x ~86m tall (~2.4:1) so
                        the dome reads as much flatter than a half-circle. The
                        drum (lower cylinder) + segmented dome above gives the
                        recognisable SkyDome silhouette next to CN Tower. */}
                    <rect x="735" y="224" width="128" height="36" />
                    <path d="M 735 224 Q 735 192 799 188 Q 863 192 863 224 Z" />

                    {/* CN Tower tapered body */}
                    <polygon points="888,260 906,260 902,82 892,82" />

                    {/* East-side towers */}
                    <rect x="924" y="146" width="28" height="114" />
                    <polygon points="952,260 952,116 982,116 982,128 996,128 996,260" />
                    <rect x="996" y="138" width="32" height="122" />
                    {/* Setback on tallest east tower */}
                    <polygon points="1028,260 1028,108 1052,108 1052,124 1058,124 1058,260" />
                    <rect x="1058" y="148" width="28" height="112" />
                    <rect x="1086" y="130" width="34" height="130" />
                    <rect x="1120" y="160" width="28" height="100" />
                    <rect x="1148" y="180" width="32" height="80" />
                    <rect x="1180" y="200" width="20" height="60" />
                </g>

                {/* === Vertical "moonlit edge" highlights on larger glass facades
                    (a 1px strip slightly lighter than building fill, suggesting
                    light catching the corner) === */}
                <g fill="#1D1F24">
                    <rect x="368" y="120" width="1" height="140" />
                    <rect x="528" y="78"  width="1" height="182" />
                    <rect x="600" y="108" width="1" height="152" />
                    <rect x="924" y="146" width="1" height="114" />
                    <rect x="1086" y="130" width="1" height="130" />
                </g>

                {/* === Rooftop equipment (HVAC / water tanks) === */}
                <g fill="#15171B">
                    <rect x="148" y="182" width="6" height="4" />
                    <rect x="162" y="182" width="3" height="4" />
                    <rect x="218" y="170" width="5" height="4" />
                    <rect x="244" y="186" width="7" height="4" />
                    <rect x="345" y="134" width="5" height="4" />
                    <rect x="354" y="134" width="3" height="4" />
                    <rect x="375" y="116" width="6" height="4" />
                    <rect x="390" y="116" width="3" height="4" />
                    <rect x="470" y="128" width="5" height="4" />
                    <rect x="500" y="114" width="6" height="4" />
                    <rect x="535" y="74"  width="6" height="4" />
                    <rect x="550" y="74"  width="4" height="4" />
                    <rect x="558" y="74"  width="5" height="4" />
                    <rect x="640" y="134" width="5" height="4" />
                    <rect x="672" y="152" width="6" height="4" />
                    <rect x="928" y="142" width="5" height="4" />
                    <rect x="1000" y="134" width="6" height="4" />
                    <rect x="1090" y="126" width="5" height="4" />
                    <rect x="1100" y="126" width="4" height="4" />
                    <rect x="1124" y="156" width="5" height="4" />
                </g>

                {/* === Antennae on selected towers === */}
                <g stroke="#1C2A30" strokeWidth="0.8" strokeLinecap="square">
                    <line x1="383" y1="120" x2="383" y2="96"  />
                    <line x1="447" y1="92"  x2="447" y2="64"  />
                    <line x1="549" y1="78"  x2="549" y2="42"  />
                    <line x1="649" y1="138" x2="649" y2="118" />
                    <line x1="1003" y1="138" x2="1003" y2="112" />
                    <line x1="1043" y1="108" x2="1043" y2="78" />
                    <line x1="1102" y1="130" x2="1102" y2="110" />
                </g>

                {/* === Blinking window lights ===
                    Each window mostly stays dim and briefly flashes bright once
                    per cycle. Co-prime durations + negative begin offsets keep
                    only a handful lit at any given moment. */}
                <g fill="#34E5FF">
                    {windowLights.map((w, i) => (
                        <rect
                            key={`w-${i}`}
                            x={w.x}
                            y={w.y}
                            width="1"
                            height="2"
                            opacity="0.08"
                        >
                            <animate
                                attributeName="opacity"
                                values="0.08;0.08;0.85;0.55;0.08;0.08"
                                keyTimes="0;0.6;0.66;0.74;0.82;1"
                                dur={`${w.dur}s`}
                                begin={`${w.begin}s`}
                                repeatCount="indefinite"
                            />
                        </rect>
                    ))}
                </g>

                {/* Rogers Centre -- detail layer:
                    Outer rim highlight + 3 retractable-roof panel seams across
                    the dome + vertical structural ribs on the drum. These are
                    what make the silhouette read as the SkyDome rather than a
                    generic mound. */}
                <g stroke="#1C2A30" fill="none">
                    {/* Outer dome rim */}
                    <path d="M 735 224 Q 735 192 799 188 Q 863 192 863 224" strokeWidth="0.8" />
                    {/* Roof panel seam 1 -- top, shortest arc */}
                    <path d="M 762 196 Q 799 190 836 196" strokeWidth="0.55" />
                    {/* Roof panel seam 2 -- middle */}
                    <path d="M 750 208 Q 799 198 848 208" strokeWidth="0.55" />
                    {/* Roof panel seam 3 -- bottom, longest, meets drum */}
                    <path d="M 740 220 Q 799 210 858 220" strokeWidth="0.55" />
                </g>
                <g stroke="#1C2A30" strokeWidth="0.45">
                    {/* Drum structural ribs */}
                    <line x1="754" y1="224" x2="754" y2="258" />
                    <line x1="772" y1="224" x2="772" y2="258" />
                    <line x1="790" y1="224" x2="790" y2="258" />
                    <line x1="808" y1="224" x2="808" y2="258" />
                    <line x1="826" y1="224" x2="826" y2="258" />
                    <line x1="844" y1="224" x2="844" y2="258" />
                </g>

                {/* === CN Tower spire + pod + antenna === */}
                <g>
                    {/* Continuous spire from antenna base into the main pod */}
                    <polygon points="895.6,34 898.4,34 898.4,80 895.6,80" fill="#15171B" />

                    {/* Main pod -- iconic disc with lime ring on the protruding rim */}
                    <ellipse cx="897" cy="78" rx="19" ry="6.5" fill="#15171B" stroke="#34E5FF" strokeWidth="1" />

                    {/* Lower restaurant level -- subtle inner detail */}
                    <ellipse cx="897" cy="82.5" rx="13" ry="3" fill="#15171B" stroke="#1C2A30" strokeWidth="0.5" opacity="0.9" />

                    {/* Antenna mast */}
                    <line x1="897" y1="34" x2="897" y2="12" stroke="#34E5FF" strokeWidth="0.8" />

                    {/* Beacon: steady core + expanding radar halo */}
                    <circle cx="897" cy="12" r="2" fill="none" stroke="#34E5FF" strokeWidth="0.6">
                        <animate
                            attributeName="r"
                            values="2;9;9"
                            keyTimes="0;0.55;1"
                            dur="3.4s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0.9;0;0"
                            keyTimes="0;0.55;1"
                            dur="3.4s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle cx="897" cy="12" r="2" fill="none" stroke="#34E5FF" strokeWidth="0.4">
                        <animate
                            attributeName="r"
                            values="2;6.5;6.5"
                            keyTimes="0;0.55;1"
                            dur="3.4s"
                            begin="1.2s"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeName="opacity"
                            values="0.6;0;0"
                            keyTimes="0;0.55;1"
                            dur="3.4s"
                            begin="1.2s"
                            repeatCount="indefinite"
                        />
                    </circle>
                    <circle cx="897" cy="12" r="1.6" fill="#34E5FF">
                        <animate
                            attributeName="opacity"
                            values="0.9;1;0.9"
                            dur="2.2s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            </svg>
        </div>
    );
}
