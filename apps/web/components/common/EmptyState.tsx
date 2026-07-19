import { FolderOpen, type LucideIcon } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  actionLabel?: string;
  onAction?: () => void;
};

export default function EmptyState({
  title,
  description,
  icon: Icon = FolderOpen,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-dashed border-white/15 bg-white/[0.025] px-6 py-14 text-center">
      <div className="absolute left-1/2 top-0 h-32 w-32 -translate-x-1/2 rounded-full bg-orange-500/10 blur-3xl" />
      <div className="relative mx-auto flex max-w-sm flex-col items-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-500/10 text-orange-300">
          <Icon size={24} />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-white/50">{description}</p>
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="mt-6 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-400"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}
