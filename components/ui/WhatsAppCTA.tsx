import { whatsappHref, telHref, type EnquiryContext } from "@/lib/whatsapp";
import { site } from "@/content/site";

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.24 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.17 1.73 2.64 4.19 3.7.59.25 1.04.4 1.4.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}

export default function WhatsAppCTA({
  ctx,
  label = "Book on WhatsApp",
  className = "",
  variant = "solid",
}: {
  ctx?: EnquiryContext;
  label?: string;
  className?: string;
  variant?: "solid" | "ghost";
}) {
  const styles =
    variant === "solid"
      ? "bg-brass text-ink hover:bg-haldu"
      : "border border-brass/45 text-rice hover:border-brass hover:bg-brass/10";

  return (
    <a
      href={whatsappHref(ctx)}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${styles} ${className}`}
    >
      <WhatsAppGlyph />
      {label}
    </a>
  );
}

/** §8.3 — one tap away, always. */
export function CallCTA({ className = "" }: { className?: string }) {
  return (
    <a
      href={telHref}
      className={`inline-flex items-center gap-2 text-[0.8125rem] tracking-[0.06em] text-rice/80 transition-colors hover:text-rice ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
        <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
      </svg>
      <span className="tnum">{site.phoneDisplay}</span>
    </a>
  );
}
