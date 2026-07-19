import { Activity, CheckCircle2 } from "lucide-react";

type SidebarStatusProps = {
  label?: string;
  detail?: string;
  healthy?: boolean;
};

export default function SidebarStatus({
  label = "Ollama online",
  detail = "Local inference ready",
  healthy = true,
}: SidebarStatusProps) {
  const color = healthy ? "text-emerald-300" : "text-amber-300";

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.035] p-3">
      <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${healthy ? "bg-emerald-400/10" : "bg-amber-400/10"} ${color}`}>
        {healthy ? <CheckCircle2 size={17} /> : <Activity size={17} />}
      </span>
      <span className="min-w-0">
        <span className={`block text-xs font-medium ${color}`}>{label}</span>
        <span className="mt-0.5 block truncate text-[11px] text-white/40">{detail}</span>
      </span>
    </div>
  );
}
