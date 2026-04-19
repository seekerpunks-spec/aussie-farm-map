import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Briefcase,
  Tractor,
  Zap,
  Mail,
  CheckCircle2,
  Flame,
  ArrowUpRight,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Dashboard — FarmBot" },
      {
        name: "description",
        content:
          "Your 88-day companion. Track jobs, drafts, and matched farm listings across Australia.",
      },
      { property: "og:title", content: "Dashboard — FarmBot" },
      {
        property: "og:description",
        content: "Track jobs, drafts and matched farm listings across Australia.",
      },
    ],
  }),
  component: DashboardPage,
});

const RECENT = [
  {
    title: "Commercial Fishing Deck Hand",
    company: "Hat Head Seafood",
    region: "Hat Head, Kempsey",
    source: "Backpacker Job Board",
    tag: "likely eligible" as const,
  },
  {
    title: "Dairy Farm Worker",
    company: "WJ&PM SIMPSON P/L",
    region: "Cudgewa, Victoria",
    source: "Backpacker Job Board",
    tag: "likely eligible" as const,
  },
  {
    title: "88 Day Picking Job",
    company: "Sg Contact",
    region: "Coffs Harbour",
    source: "Backpacker Job Board",
    tag: "likely eligible" as const,
  },
  {
    title: "Aquaculture Assistant — South Coast NSW",
    company: "Broadwater Oysters",
    region: "Broadwater, NSW",
    source: "Backpacker Job Board",
    tag: "likely eligible" as const,
  },
  {
    title: "Level 3 Harvest Operators — 2026 Almond Harvest",
    company: "All Seasons Workforce Australia",
    region: "Robinvale, Victoria",
    source: "Backpacker Job Board",
    tag: "easy entry" as const,
  },
];

function DashboardPage() {
  return (
    <main className="px-6 sm:px-10 py-8 sm:py-10 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 animate-float-up">
        <div>
          <div className="font-hand text-2xl text-primary-deep rotate-[-2deg] inline-block">
            ~ welcome back, drifter ~
          </div>
          <h1 className="mt-1 font-display text-5xl sm:text-6xl text-foreground leading-[0.95]">
            Dashboard
          </h1>
          <p className="mt-2 font-serif-d italic text-base text-foreground/70">
            Last scrape · Backpacker Job Board · 19 Apr 2026, 3:43 am
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/app/jobs"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-foreground text-background font-display text-xs uppercase tracking-widest border-2 border-foreground shadow-sticker hover:bg-primary hover:-translate-y-0.5 transition-all"
          >
            Browse Jobs <ArrowRight className="w-4 h-4" />
          </Link>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-card text-foreground font-display text-xs uppercase tracking-widest border-2 border-foreground shadow-sticker hover:-translate-y-0.5 transition-all">
            <RefreshCw className="w-4 h-4" /> Scrape
          </button>
        </div>
      </div>

      {/* KPI stickers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        <KpiSticker
          label="Total Jobs"
          value="1,579"
          caption="1579 discovered today"
          icon={Briefcase}
          variant="primary"
          rotate="-1deg"
          delay={0.1}
        />
        <KpiSticker
          label="Farm Jobs"
          value="997"
          caption="filtered for 2nd-year visa"
          icon={Tractor}
          variant="ocean"
          rotate="0.8deg"
          delay={0.18}
        />
        <KpiSticker
          label="Easy Entry"
          value="582"
          caption="no experience needed"
          icon={Zap}
          variant="sun"
          rotate="-0.6deg"
          delay={0.26}
        />
      </div>

      {/* Status cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        <StatusCard
          label="Pending Drafts"
          value={2}
          icon={Mail}
          to="/app/drafts"
          delay={0.34}
          rotate="0.4deg"
        />
        <StatusCard
          label="Approved"
          value={1}
          icon={CheckCircle2}
          to="/app/history"
          delay={0.4}
          rotate="-0.4deg"
        />
      </div>

      {/* Recent listings */}
      <section
        className="mt-10 bg-card border-2 border-foreground shadow-sticker p-5 sm:p-7 animate-float-up"
        style={{ animationDelay: "0.5s" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-sun border-2 border-foreground grid place-items-center rotate-[-8deg]">
              <Flame className="w-4 h-4 text-foreground" strokeWidth={2.5} />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl text-foreground">
              Recent Listings
            </h2>
          </div>
          <Link
            to="/app/jobs"
            className="font-hand text-xl text-primary-deep hover:text-primary inline-flex items-center gap-1"
          >
            view all <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <ul className="divide-y-2 divide-foreground/10">
          {RECENT.map((job, i) => (
            <li
              key={job.title}
              className="py-4 flex items-start sm:items-center gap-3 sm:gap-4 group hover:bg-secondary/30 -mx-3 px-3 transition-colors"
              style={{
                animation: `float-up 0.5s var(--ease-out-soft) ${0.55 + i * 0.04}s both`,
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="font-display text-base sm:text-lg text-foreground truncate">
                  {job.title}
                </div>
                <div className="mt-0.5 font-sans text-sm text-foreground/60 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <span className="truncate">{job.company}</span>
                  <span className="text-foreground/30">·</span>
                  <span className="truncate">{job.region}</span>
                  <span className="text-foreground/30 hidden sm:inline">·</span>
                  <span className="hidden sm:inline truncate text-foreground/50">
                    {job.source}
                  </span>
                </div>
              </div>
              <span
                className={`shrink-0 px-2.5 py-1 font-display text-[10px] uppercase tracking-widest border-2 border-foreground rotate-[-2deg] ${
                  job.tag === "easy entry"
                    ? "bg-accent text-accent-foreground"
                    : "bg-sun text-foreground"
                }`}
              >
                {job.tag}
              </span>
              <ArrowUpRight className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors shrink-0" />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

/* ---------- subcomponents ---------- */

type KpiVariant = "primary" | "ocean" | "sun";

function KpiSticker({
  label,
  value,
  caption,
  icon: Icon,
  variant,
  rotate,
  delay,
}: {
  label: string;
  value: string;
  caption: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  variant: KpiVariant;
  rotate: string;
  delay: number;
}) {
  const styles =
    variant === "primary"
      ? "bg-primary text-primary-foreground"
      : variant === "ocean"
        ? "bg-accent text-accent-foreground"
        : "bg-sun text-foreground";
  const iconBg =
    variant === "primary"
      ? "bg-primary-deep/40"
      : variant === "ocean"
        ? "bg-foreground/20"
        : "bg-foreground/15";

  return (
    <div
      className={`relative ${styles} border-2 border-foreground shadow-sticker p-5 sm:p-6 animate-float-up`}
      style={{
        transform: `rotate(${rotate})`,
        animationDelay: `${delay}s`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-[11px] uppercase tracking-widest opacity-90">
            {label}
          </div>
          <div className="mt-2 font-display text-5xl sm:text-6xl leading-none">
            {value}
          </div>
        </div>
        <div
          className={`w-12 h-12 ${iconBg} border-2 border-current/30 grid place-items-center rotate-[-6deg] shrink-0`}
        >
          <Icon className="w-5 h-5" strokeWidth={2.5} />
        </div>
      </div>
      <div className="mt-4 font-hand text-lg opacity-95">{caption}</div>
      {/* corner sticker */}
      <div className="absolute -top-2 -right-2 w-5 h-5 bg-foreground rounded-full border-2 border-background" />
    </div>
  );
}

function StatusCard({
  label,
  value,
  icon: Icon,
  to,
  delay,
  rotate,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  to: string;
  delay: number;
  rotate: string;
}) {
  return (
    <Link
      to={to}
      className="group relative bg-card border-2 border-foreground shadow-sticker p-5 sm:p-6 hover:-translate-y-1 transition-all animate-float-up flex items-center gap-4"
      style={{
        transform: `rotate(${rotate})`,
        animationDelay: `${delay}s`,
      }}
    >
      <div className="w-12 h-12 bg-secondary border-2 border-foreground grid place-items-center rotate-[-4deg] shrink-0">
        <Icon className="w-5 h-5 text-primary-deep" strokeWidth={2.5} />
      </div>
      <div className="flex-1">
        <div className="font-display text-[11px] uppercase tracking-widest text-foreground/60">
          {label}
        </div>
        <div className="font-display text-4xl text-foreground leading-none mt-1">
          {value}
        </div>
      </div>
      <span className="font-hand text-xl text-primary-deep group-hover:text-primary inline-flex items-center gap-1">
        view all <ArrowUpRight className="w-4 h-4" />
      </span>
    </Link>
  );
}
