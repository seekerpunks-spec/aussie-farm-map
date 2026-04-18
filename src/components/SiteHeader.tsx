import { Link } from "@tanstack/react-router";
import { Compass } from "lucide-react";

const NAV = [
  { to: "/" as const, label: "Home" },
  { to: "/farms" as const, label: "Farm List" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/75 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-ocean grid place-items-center shadow-glow group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-extrabold text-foreground tracking-tight">Driftwork</div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Aus Farm Atlas</div>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true }}
              className="px-4 py-2 rounded-full text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              activeProps={{ className: "px-4 py-2 rounded-full text-sm font-semibold text-primary-foreground bg-gradient-ocean shadow-soft" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
