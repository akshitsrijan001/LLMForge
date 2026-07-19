type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export default function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-orange-300/80">{eyebrow}</p>
        )}
        <h2 className="mt-1 text-xl font-semibold text-white">{title}</h2>
        {description && <p className="mt-2 text-sm text-white/50">{description}</p>}
      </div>
      {action}
    </div>
  );
}
