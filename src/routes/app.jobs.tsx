import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, Filter, Mail, ArrowRight, AlertTriangle, Pin } from "lucide-react";

export const Route = createFileRoute("/app/jobs")({
  head: () => ({
    meta: [
      { title: "Jobs — FarmBot" },
      {
        name: "description",
        content:
          "Live farm jobs pre-screened against ATO Regional Australia postcodes and 88-day visa rules.",
      },
      { property: "og:title", content: "Live jobs that count for 88 days" },
      {
        property: "og:description",
        content:
          "Fresh farm-work listings from Workforce Australia, GOFARM and WHM sources — pre-screened.",
      },
    ],
  }),
  component: JobsPage,
});

type Notice = {
  id: string;
  title: string;
  location: string;
  postcode: string;
  source: string;
  date: string;
  eligible: boolean;
  tape: "amber" | "rose" | "teal" | "sun";
  rotate: number;
};

const POOL: Notice[] = [
  {
    id: "1",
    title: "Field Service & Workshop Technician — Kalgoorlie, WA",
    location: "Kalgoorlie, WA",
    postcode: "6430",
    source: "Workforce Aust",
    date: "Apr 20",
    eligible: true,
    tape: "amber",
    rotate: -3,
  },
  {
    id: "2",
    title: "Agricultural Maintenance Officer — Diesel Mechanic",
    location: "Adelaide, SA",
    postcode: "5000",
    source: "Workforce Aust",
    date: "Apr 20",
    eligible: true,
    tape: "rose",
    rotate: 2,
  },
  {
    id: "3",
    title: "Station Hand",
    location: "Blackall, QLD",
    postcode: "4472",
    source: "Workforce Aust",
    date: "Apr 20",
    eligible: true,
    tape: "teal",
    rotate: -2,
  },
  {
    id: "4",
    title: "Farmer — Nguyen Thi Chau Farm",
    location: "Humpty Doo, NT",
    postcode: "0836",
    source: "Workforce Aust",
    date: "Apr 20",
    eligible: true,
    tape: "sun",
    rotate: 3,
  },
  {
    id: "5",
    title: "Almond Harvest Operator — Level 3",
    location: "Robinvale, VIC",
    postcode: "3549",
    source: "GOFARM",
    date: "Apr 20",
    eligible: true,
    tape: "rose",
    rotate: -1,
  },
  {
    id: "6",
    title: "Aquaculture Assistant — South Coast",
    location: "Broadwater, NSW",
    postcode: "2472",
    source: "WHM Source",
    date: "Apr 20",
    eligible: true,
    tape: "amber",
    rotate: 2,
  },
  {
    id: "7",
    title: "Dairy Farm Worker",
    location: "Cudgewa, VIC",
    postcode: "3705",
    source: "Backpacker JB",
    date: "Apr 20",
    eligible: true,
    tape: "teal",
    rotate: -2,
  },
];

function JobsPage() {
  // Live board: rotate which 4 notices are visible — gives the feel of fresh listings landing.
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOffset((o) => (o + 1) % POOL.length), 4500);
    return () => clearInterval(id);
  }, []);

  const visible = Array.from({ length: 4 }, (_, i) => POOL[(offset + i) % POOL.length]);

  return (
    <main className="px-6 sm:px-10 py-8 sm:py-10 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-10 lg:gap-14 items-start">
        {/* LEFT — editorial copy */}
        <section className="animate-float-up">
          <div className="font-hand text-2xl text-primary-deep rotate-[-2deg] inline-block">
            ~ today's bulletin board ~
          </div>
          <h1 className="mt-2 font-display text-[64px] sm:text-[80px] leading-[0.9] text-foreground">
            Live jobs
            <br />
            that count
            <br />
            for <span className="text-primary">88 days.</span>
          </h1>

          <p className="mt-6 max-w-md font-serif-d italic text-[17px] leading-relaxed text-foreground/75">
            Every day we pull fresh farm-work listings from Workforce Australia,
            GOFARM and the WHM sources — then screen each one against the ATO
            Regional Australia postcodes and visa rules. Only the keepers get
            pinned here.
          </p>

          {/* Counters */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <div className="bg-card border-2 border-foreground shadow-sticker px-5 py-3 rotate-[-1deg]">
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-foreground/60" strokeWidth={2.5} />
                <span className="font-display text-2xl text-foreground leading-none">984</span>
                <span className="font-hand text-base text-foreground/70">active listings</span>
              </div>
            </div>
            <div className="bg-accent text-accent-foreground border-2 border-foreground shadow-sticker px-5 py-3 rotate-[1deg]">
              <div className="flex items-center gap-3">
                <Filter className="w-4 h-4" strokeWidth={2.5} />
                <span className="font-display text-2xl leading-none">550</span>
                <span className="font-hand text-base">pre-screened eligible</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-7 flex items-center gap-4">
            <Link
              to="/app"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-foreground text-background font-display text-sm uppercase tracking-[0.2em] border-2 border-foreground shadow-sticker hover:bg-primary-deep hover:-translate-y-0.5 transition-all"
            >
              Open the board <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="font-hand text-lg text-primary-deep">
              → fresh listings, pre-screened
            </span>
          </div>

          {/* Steps */}
          <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
            <Step n={1} label="FIND" caption="new listings, refreshed every day" icon={Search} />
            <Step n={2} label="SCREEN" caption="WHV rules, Schedule 1 postcodes" icon={Filter} />
            <Step n={3} label="APPLY" caption="contacts surfaced, drafts ready" icon={Mail} />
          </div>

          {/* Heads up */}
          <div className="mt-6 max-w-lg bg-secondary/60 border-2 border-foreground/70 px-4 py-3 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 mt-0.5 text-primary-deep shrink-0" strokeWidth={2.5} />
            <p className="text-sm text-foreground/80 leading-relaxed">
              <span className="font-display text-xs uppercase tracking-widest text-foreground">
                Heads up
              </span>{" "}
              — roles can fill fast and listings don't always get taken down. Open
              the source link and make sure the job is still live before sending
              your application.
            </p>
          </div>
        </section>

        {/* RIGHT — live cork board */}
        <aside className="relative animate-float-up" style={{ animationDelay: "0.15s" }}>
          {/* Cork board */}
          <div
            className="relative aspect-[5/6] sm:aspect-[6/6] border-2 border-foreground shadow-sticker overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse at 30% 20%, oklch(0.88 0.06 75 / 0.6), transparent 60%), radial-gradient(ellipse at 80% 90%, oklch(0.82 0.07 60 / 0.5), transparent 55%), oklch(0.91 0.04 80)",
            }}
          >
            {/* Cork dot texture */}
            <div
              className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, oklch(0.45 0.05 60 / 0.4) 1px, transparent 0)",
                backgroundSize: "8px 8px",
              }}
            />

            {/* Top tape strips */}
            <Tape className="absolute -top-2 left-8 w-24 -rotate-6" color="amber" />
            <Tape className="absolute -top-2 right-10 w-24 rotate-3" color="rose" />

            {/* Header */}
            <div className="relative z-10 pt-7 pb-2 text-center">
              <span className="font-hand text-2xl text-primary-deep rotate-[-1deg] inline-block">
                ~ today's notices ~
              </span>
            </div>

            {/* Notices grid */}
            <div className="relative z-10 grid grid-cols-2 gap-4 sm:gap-5 px-5 sm:px-7 pb-7 mt-3">
              {visible.map((n, i) => (
                <NoticeCard key={`${n.id}-${offset}-${i}`} notice={n} index={i} />
              ))}
            </div>
          </div>

          <p className="mt-4 font-hand text-lg text-primary-deep text-center rotate-[-1deg]">
            ~ updates every few seconds ~
          </p>
        </aside>
      </div>
    </main>
  );
}

/* ---------- subcomponents ---------- */

function Step({
  n,
  label,
  caption,
  icon: Icon,
}: {
  n: number;
  label: string;
  caption: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <div className="bg-card border-2 border-foreground/80 shadow-sticker p-3">
      <div className="flex items-center justify-between">
        <span className="font-display text-base text-foreground/60">{n}.</span>
        <Icon className="w-3.5 h-3.5 text-foreground/60" strokeWidth={2.5} />
      </div>
      <div className="mt-1 font-display text-sm tracking-wider text-foreground">{label}</div>
      <div className="mt-1 font-serif-d italic text-[11px] text-foreground/60 leading-snug">
        {caption}
      </div>
    </div>
  );
}

function Tape({
  className = "",
  color,
}: {
  className?: string;
  color: "amber" | "rose" | "teal" | "sun";
}) {
  const bg =
    color === "amber"
      ? "bg-sun/80"
      : color === "rose"
        ? "bg-primary/50"
        : color === "teal"
          ? "bg-accent/60"
          : "bg-sun/70";
  return (
    <div
      className={`${bg} h-5 border-x border-foreground/10 shadow-[0_2px_4px_rgba(0,0,0,0.1)] ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, transparent 0 6px, rgba(255,255,255,0.25) 6px 7px)",
      }}
    />
  );
}

function NoticeCard({ notice, index }: { notice: Notice; index: number }) {
  return (
    <div
      className="relative bg-card border-2 border-foreground/85 shadow-sticker p-3"
      style={{
        transform: `rotate(${notice.rotate}deg)`,
        animation: `float-up 0.6s var(--ease-out-soft) ${index * 0.08}s both`,
      }}
    >
      {/* Pin */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary-deep border-2 border-foreground grid place-items-center shadow-md">
        <Pin className="w-2.5 h-2.5 text-background" strokeWidth={3} fill="currentColor" />
      </div>

      {/* Header row */}
      <div className="flex items-center justify-between gap-2">
        <span className="font-display text-[10px] tracking-[0.2em] text-foreground/70">
          WANTED
        </span>
        {notice.eligible && (
          <span className="bg-accent text-accent-foreground font-display text-[9px] tracking-widest px-1.5 py-0.5 border border-foreground/70">
            ELIGIBLE
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="mt-2 font-display text-[15px] leading-tight text-foreground line-clamp-2 min-h-[36px]">
        {notice.title}
      </h3>

      {/* Location */}
      <div className="mt-2 font-hand text-base text-primary-deep leading-tight">
        ⌖ {notice.location}, {notice.postcode}
      </div>

      {/* Footer */}
      <div className="mt-3 pt-2 border-t border-dashed border-foreground/30 flex items-baseline justify-between">
        <span className="font-display text-[9px] tracking-widest text-foreground/60 uppercase">
          {notice.source}
        </span>
        <span className="font-hand text-sm text-foreground/60">{notice.date}</span>
      </div>
    </div>
  );
}
