import type { ReactNode } from "react";
import { TLink } from "@/components/motion/PageTransition";

type Variant = "solid" | "ghost" | "quiet" | "cream";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass";

const variants: Record<Variant, string> = {
  solid: "sheen bg-gold text-charcoal hover:bg-haldu",
  ghost: "border border-brass/45 text-rice hover:border-brass hover:bg-brass/10",
  quiet: "text-rice/75 hover:text-rice underline-offset-4 hover:underline",
  cream: "bg-cocoa text-cream hover:bg-cocoa-soft",
};

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & Record<string, unknown>) {
  return (
    <TLink href={href} data-magnetic className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </TLink>
  );
}

export function ButtonTag({
  children,
  variant = "solid",
  className = "",
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
