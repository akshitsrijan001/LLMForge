import { ArrowUpRight, type LucideIcon } from "lucide-react";

type QuickActionProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
  shortcut?: string;
  onClick: () => void;
};

export default function QuickAction({
  title,
  description,
  icon: Icon,
  color = "#fb923c",
  shortcut,
  onClick,
}: QuickActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 text-left transition hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.055]"
    >
      <span
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-3xl transition group-hover:opacity-60"
        style={{ background: color }}
      />
      <div className="relative flex items-start justify-between gap-3">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10"
          style={{ color, backgroundColor: `${color}18` }}
        >
          <Icon size={19} />
        </span>
        {shortcut && (
          <kbd className="font-mono text-[9px] uppercase tracking-widest text-white/35">{shortcut}</kbd>
        )}
      </div>
      <div className="relative mt-5 flex items-center gap-2">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <ArrowUpRight size={14} className="text-white/35 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
      <p className="relative mt-2 text-xs leading-5 text-white/50">{description}</p>
    </button>
  );
}
