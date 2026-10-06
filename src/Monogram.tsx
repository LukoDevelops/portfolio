/** One flat, circular identity mark, shared with the career documents. */
export function Monogram({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`monogram ${className}`}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="32" cy="32" r="30" fill="#C8EBCD" />
      <circle
        cx="32"
        cy="32"
        r="25.5"
        fill="none"
        stroke="#6F957B"
        strokeWidth=".8"
      />
      <path d="M21 17H29V44H43V51H21Z" fill="#10291F" />
    </svg>
  );
}
