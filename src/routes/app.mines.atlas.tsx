import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PermitCard } from "@/components/mines/PermitCard";
import { MINE_STATES, TOTAL_MINE_SITES } from "@/lib/mines-data";

export const Route = createFileRoute("/app/mines/atlas")({
  head: () => ({
    meta: [
      { title: "Atlas — Mining states across Australia | FarmBot" },
      { name: "description", content: `Browse ${TOTAL_MINE_SITES.toLocaleString()} mining sites across 5 Australian states. Pick a state to see operations.` },
      { property: "og:title", content: "Outback Operations Atlas — FarmBot" },
      { property: "og:description", content: "Browse mining sites across 5 Australian states." },
    ],
  }),
  component: MinesAtlasPage,
});

function MinesAtlasPage() {
  // slight rotation each card for hand-laid feel
  const rotations = [-1.2, 0.9, -0.6, 1.1, -0.8];

  return (
    <main className="min-h-screen bg-gradient-hero">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12">
        <Link
          to="/app/mines"
          className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-widest text-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to drawer
        </Link>

        {/* Hero */}
        <div className="mt-6 text-center max-w-3xl mx-auto animate-float-up">
          <div className="inline-block font-hand text-2xl text-primary-deep rotate-[-2deg]">
            ~ chapter two ~
          </div>
          <h1 className="mt-2 font-display text-5xl sm:text-7xl leading-[0.95] text-foreground">
            The Outback
            <br />
            <span className="text-primary">Operations Atlas</span>
          </h1>
          <p className="mt-4 font-serif-d italic text-lg sm:text-xl text-foreground/70">
            {TOTAL_MINE_SITES.toLocaleString()} sites · 5 states · one wild rock
          </p>
        </div>

        {/* Specimen drawer label */}
        <div className="mt-12 sm:mt-16 flex items-center gap-3">
          <div className="h-px flex-1 bg-foreground/30" />
          <div className="bg-card border-2 border-foreground shadow-sticker px-4 py-1.5 rotate-[-0.8deg]">
            <span className="font-display text-xs tracking-[0.18em] text-foreground">
              SPECIMEN DRAWER
            </span>
            <span className="font-hand text-lg text-primary-deep ml-2">
              tap a sample →
            </span>
          </div>
          <div className="h-px flex-1 bg-foreground/30" />
        </div>

        {/* Grid of 5 state permit cards */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {MINE_STATES.map((state, i) => (
            <Link
              key={state.code}
              to="/app/mines/$state"
              params={{ state: state.code }}
              className="group relative block hover:-translate-y-1 transition-all duration-300"
              style={{
                animation: `float-up 0.6s var(--ease-out-soft) ${0.1 + i * 0.06}s both`,
              }}
            >
              <PermitCard
                ore={state.primaryOre}
                rotation={rotations[i]}
                className="group-hover:shadow-elegant transition-shadow"
              />
              {/* State code badge bottom-left */}
              <div
                className="absolute -bottom-2 -left-2 bg-foreground text-background border-2 border-foreground shadow-sticker px-2.5 py-1 font-display text-sm tracking-widest"
                style={{ transform: `rotate(${rotations[i] - 3}deg)` }}
              >
                {state.code}
              </div>
              {/* Site count */}
              <div
                className="absolute -top-2 -right-2 bg-sun border-2 border-foreground rounded-full w-12 h-12 grid place-items-center font-display text-base text-foreground"
                style={{ transform: `rotate(${rotations[i] + 6}deg)` }}
              >
                {state.count}
              </div>
            </Link>
          ))}
        </div>

        {/* Caption */}
        <div className="mt-10 text-center font-hand text-xl text-foreground/60">
          ~ each card opens a different mining district ~
        </div>
      </div>
    </main>
  );
}
