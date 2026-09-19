/** Custom, resolution-independent identity for YAER / Digital Afterimage. */
export function Wordmark({
  className = "",
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 600 116"
      fill="currentColor"
      className={className}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "YAER"}
      aria-hidden={decorative || undefined}
    >
      <path d="M0 0h38l40 47L118 0h39L95 74v42H61V74Z" />
      <path d="m137 116 67-116h34l67 116h-39l-45-80-45 80Z" />
      <path d="M310 0h126v27h-92v18h76v26h-76v18h92v27H310Z" />
      <path
        fillRule="evenodd"
        d="M453 0h111l36 35-31 34 31 47h-40l-31-45h-42v45h-34Zm34 27v19h62l13-10-13-9Z"
      />
    </svg>
  );
}

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 72"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M0 0h19l18 25-15 17L0 6ZM44 0h20L25 47 8 57Zm-19 51 20-23-8 35-20 9Z" />
    </svg>
  );
}
