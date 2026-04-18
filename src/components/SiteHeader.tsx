import { Link } from "@tanstack/react-router";
import { Sun } from "lucide-react";

const NAV = [
  { to: "/" as const, label: "Home" },
  { to: "/farms" as const, label: "Farm List" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b-2 border-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full bg-primary grid place-items-center border-2 border-foreground shadow-sticker group-hover:rotate-[-8deg] transition-transform">
            <Sun className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-xl text-foreground tracking-tight">DRIFTWORK</div>
            <div className="font-hand text-sm text-primary-deep -mt-1">aussie farm atlas</div>
          </div>
        </Link>
        <nav className="flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true }}
              className="px-3 sm:px-4 py-2 font-display text-xs sm:text-sm uppercase tracking-widest text-foreground hover:text-primary transition-colors"
              activeProps={{ className: "px-3 sm:px-4 py-2 font-display text-xs sm:text-sm uppercase tracking-widest text-primary-foreground bg-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
