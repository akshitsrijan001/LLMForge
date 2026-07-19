import { ArrowUpRight, Sparkles } from "lucide-react";

type HeroBannerProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  children?: React.ReactNode;
};

export default function HeroBanner({
  eyebrow = "LLMForge workspace",
  title,
  description,
  actionLabel,
  onAction,
  children,
}: HeroBannerProps) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-gradient-to-br from-white/[0.07] via-white/[0.025] to-transparent p-6 shadow-2xl shadow-black/15 sm:p-8">
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="relative">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-orange-300/80">
          <Sparkles size={12} />
          {eyebrow}
        </div>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">{description}</p>
        {(actionLabel || children) && (
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {actionLabel && onAction && (
              <button
                type="button"
                onClick={onAction}
                className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400"
              >
                {actionLabel}
                <ArrowUpRight size={15} />
              </button>
            )}
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
