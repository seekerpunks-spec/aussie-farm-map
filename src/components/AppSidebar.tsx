import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Sparkles,
  Tractor,
  Calculator,
  FileEdit,
  History,
  Database,
  ScrollText,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
} from "lucide-react";

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
};

const SECTIONS: { label: string; items: NavItem[] }[] = [
  {
    label: "explore",
    items: [
      { to: "/app", label: "Dashboard", icon: LayoutDashboard },
      { to: "/app/jobs", label: "Jobs", icon: Briefcase },
      { to: "/app/matched", label: "Matched", icon: Sparkles },
      { to: "/app/farms", label: "Farms", icon: Tractor },
    ],
  },
  {
    label: "outils",
    items: [
      { to: "/app/tax", label: "Tax Calculator", icon: Calculator },
      { to: "/app/drafts", label: "Drafts", icon: FileEdit },
      { to: "/app/history", label: "History", icon: History },
    ],
  },
  {
    label: "système",
    items: [
      { to: "/app/sources", label: "Sources", icon: Database },
      { to: "/app/logs", label: "Logs", icon: ScrollText },
      { to: "/app/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  const isActive = (to: string) =>
    to === "/app" ? pathname === "/app" : pathname.startsWith(to);

  return (
    <aside
      className={`${
        collapsed ? "w-[72px]" : "w-[248px]"
      } shrink-0 sticky top-0 h-screen bg-card border-r-2 border-foreground flex flex-col transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] bg-paper-noise relative z-30`}
    >
      {/* perforated right edge */}
      <div className="absolute top-0 bottom-0 -right-[2px] w-[3px] bg-[radial-gradient(circle,var(--foreground)_1px,transparent_1.5px)] bg-[length:3px_8px] pointer-events-none" />

      {/* Logo / Brand */}
      <div className="px-3 pt-4 pb-3 border-b-2 border-foreground/15">
        <Link to="/app" className="flex items-center gap-2.5 group">
          <div className="w-11 h-11 shrink-0 rounded-full bg-primary grid place-items-center border-2 border-foreground shadow-sticker group-hover:rotate-[-8deg] transition-transform">
            <Sun className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <div className="leading-tight overflow-hidden">
              <div className="font-display text-xl text-foreground tracking-tight truncate">
                FARMBOT
              </div>
              <div className="font-hand text-base text-primary-deep -mt-1 truncate">
                your 88-day companion
              </div>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-5">
        {SECTIONS.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <div className="px-2 mb-1.5 font-hand text-lg text-primary-deep rotate-[-1.5deg] inline-block">
                ~ {section.label}
              </div>
            )}
            {collapsed && (
              <div className="mx-3 mb-2 h-px bg-foreground/15" />
            )}
            <ul className="space-y-1">
              {section.items.map((item, idx) => {
                const active = isActive(item.to);
                const Icon = item.icon;
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      title={collapsed ? item.label : undefined}
                      className={`group relative flex items-center gap-3 px-3 py-2 border-2 transition-all ${
                        active
                          ? "bg-foreground text-background border-foreground shadow-sticker"
                          : "bg-transparent text-foreground border-transparent hover:bg-secondary/60 hover:border-foreground/20"
                      } ${collapsed ? "justify-center" : ""}`}
                      style={{
                        transform: active
                          ? `rotate(${idx % 2 === 0 ? "-0.6deg" : "0.6deg"})`
                          : undefined,
                      }}
                    >
                      <Icon
                        className={`w-5 h-5 shrink-0 ${
                          active ? "" : "text-primary-deep"
                        }`}
                        strokeWidth={2}
                      />
                      {!collapsed && (
                        <span
                          className={`font-display text-[13px] uppercase tracking-wider truncate ${
                            active ? "" : "group-hover:text-primary"
                          }`}
                        >
                          {item.label}
                        </span>
                      )}
                      {active && !collapsed && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-sun border border-foreground" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer: collapse + signout */}
      <div className="border-t-2 border-foreground/15 p-2 space-y-1">
        <button
          onClick={() => setCollapsed((c) => !c)}
          className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-secondary/60 border-2 border-transparent hover:border-foreground/20 transition-all ${
            collapsed ? "justify-center" : ""
          }`}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? (
            <PanelLeftOpen className="w-5 h-5 text-primary-deep" strokeWidth={2} />
          ) : (
            <PanelLeftClose className="w-5 h-5 text-primary-deep" strokeWidth={2} />
          )}
          {!collapsed && (
            <span className="font-display text-[13px] uppercase tracking-wider text-foreground">
              Collapse
            </span>
          )}
        </button>
        <button
          className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-destructive/10 border-2 border-transparent hover:border-destructive/40 transition-all ${
            collapsed ? "justify-center" : ""
          }`}
          title="Sign out"
        >
          <LogOut className="w-5 h-5 text-primary-deep" strokeWidth={2} />
          {!collapsed && (
            <span className="font-display text-[13px] uppercase tracking-wider text-foreground">
              Sign out
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
