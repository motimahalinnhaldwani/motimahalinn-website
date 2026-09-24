import { telHref } from "@/lib/whatsapp";
import { site } from "@/content/site";

export function WhatsAppGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`shrink-0 ${className}`} aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.24 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.17 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

/** A front-desk bell. It rings when you hover it, and calls when you press it. */
export function BellGlyph({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={`bell shrink-0 overflow-visible ${className}`} aria-hidden="true" fill="none">
      <g className="bell-dome">
        <circle cx="16" cy="7.5" r="1.8" fill="currentColor" />
        <path d="M5 23a11 11 0 0 1 22 0Z" fill="currentColor" />
        <path d="M9 19.5a8 8 0 0 1 5-5" stroke="rgba(255,255,255,.45)" strokeWidth="1.4" strokeLinecap="round" />
      </g>
      <rect x="3" y="23.5" width="26" height="3" rx="1.5" fill="currentColor" />
      <circle className="bell-ding" cx="16" cy="15" r="13" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-sm px-5 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300";
const variants = {
  solid: "sheen bg-gold text-charcoal hover:bg-haldu",
  ghost: "border border-brass/45 text-rice hover:border-brass hover:bg-brass/10",
  cocoa: "bg-cocoa text-cream hover:bg-cocoa-soft",
} as const;

export default function WhatsAppCTA({
  href,
  label = "Book on WhatsApp",
  className = "",
  variant = "solid",
}: {
  href: string;
  label?: string;
  className?: string;
  variant?: keyof typeof variants;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-magnetic
      className={`${base} ${variants[variant]} ${className}`}
    >
      <WhatsAppGlyph />
      {label}
    </a>
  );
}

export function CallButton({
  className = "",
  variant = "ghost",
  label,
}: {
  className?: string;
  variant?: keyof typeof variants;
  label?: string;
}) {
  return (
    <a
      href={telHref}
      data-magnetic
      className={`bell-btn ${base} ${variants[variant]} ${className}`}
      aria-label={`Call the front desk on ${site.phoneDisplay}`}
    >
      <BellGlyph className="h-[1.1rem] w-[1.1rem]" />
      <span className="tnum normal-case tracking-[0.04em]">{label ?? site.phoneDisplay}</span>
    </a>
  );
}

/** Quiet inline phone link, for footers and headers. */
export function CallCTA({ className = "" }: { className?: string }) {
  return (
    <a
      href={telHref}
      className={`bell-btn inline-flex items-center gap-2 text-[0.8125rem] tracking-[0.04em] text-rice/80 transition-colors hover:text-rice ${className}`}
      aria-label={`Call ${site.phoneDisplay}`}
    >
      <BellGlyph className="h-4 w-4 text-brass" />
      <span className="tnum">{site.phoneDisplay}</span>
    </a>
  );
}
