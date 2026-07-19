"use client";

import Link from "next/link";
import { type LucideIcon } from "lucide-react";

export type SidebarNavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
};

type SidebarNavigationProps = {
  items: SidebarNavigationItem[];
  activeHref: string;
};

export default function SidebarNavigation({
  items,
  activeHref,
}: SidebarNavigationProps) {
  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const Icon = item.icon;
        const active = activeHref === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
              active
                ? "border border-orange-500/25 bg-orange-500/15 text-orange-300"
                : "text-white/60 hover:bg-white/[0.05] hover:text-white"
            }`}
          >
            <Icon size={17} />
            <span className="flex-1">{item.label}</span>
            {item.badge && (
              <span className="rounded-md bg-orange-500/15 px-1.5 py-0.5 font-mono text-[9px] text-orange-300">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
