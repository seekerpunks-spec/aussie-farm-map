import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PermitCard } from "@/components/mines/PermitCard";
import { TOTAL_MINE_SITES, MINE_STATES, type OreCode } from "@/lib/mines-data";

export const Route = createFileRoute("/app/mines/")({
  head: () => ({
    meta: [
      { title: "Mines — FarmBot Outback Operations Atlas" },
      { name: "description", content: `A pocket directory of ${TOTAL_MINE_SITES} mining sites, processing plants and FIFO operations across the Australian outback.` },
      { property: "og:title", content: "Mines — FarmBot" },
      { property: "og:description", content: "Find your next mining site. Built for backpackers chasing real specified work." },
    ],
  }),
  component: MinesSplashPage,
});

// Six ores shown in the specimen drawer
const DRAWER_ORES: OreCode[] = ["IRON", "GOLD", "COAL", "COPPER", "URANIUM", "BAUXITE"];

function MinesSplashPage() {
  // tiny rotation per card for that hand-arranged feel
  const rotations = [-1.2, 0.8, -0.6, 1.1, -0.9, 0.7];

  return (
    <main className="min-h-screen bg-gradient-hero">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-16">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-center">
          {/* LEFT — editorial copy */}
          <div className="animate-float-up">
            <div className="font-hand text-2xl text-primary-deep rotate-[-1.5deg] inline-block">
              ~ dispatched from the outback ~
            </div>
            <h1 className="mt-3 font-display text-6xl sm:text-7xl lg:text-[88px] leading-[0.92] text-foreground">
              Find
              <br />
              your next
              <br />
              <span className="text-primary">mining</span>
              <br />
              site.
            </h1>
            <p className="mt-6 font-serif-d italic text-lg sm:text-xl text-foreground/75 max-w-md leading-relaxed">
              A pocket directory of {TOTAL_MINE_SITES.toLocaleString()} mining sites,
              processing plants and FIFO operations across the outback —
              built for backpackers chasing real specified work.
            </p>

            <div className="mt-8 flex flex-col items-start gap-3">
              <Link
                to="/app/mines/atlas"
                className="group inline-flex items-center gap-3 bg-primary text-primary-foreground border-2 border-foreground shadow-sticker px-6 py-3.5 hover:-translate-y-0.5 hover:shadow-elegant transition-all"
              >
                <span className="font-display text-base tracking-[0.18em]">
                  OPEN THE DRAWER
                </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
              </Link>
              <span className="font-hand text-xl text-primary-deep pl-2">
                → pick a specimen, find your site
              </span>
            </div>
          </div>

          {/* RIGHT — specimen drawer */}
          <div className="relative animate-float-up" style={{ animationDelay: "0.15s" }}>
            <SpecimenDrawer rotations={rotations} ores={DRAWER_ORES} />

            {/* Hard hat tag */}
            <div className="absolute -top-4 -right-2 sm:-right-6 rotate-[8deg] z-10">
              <div className="bg-sun border-2 border-foreground shadow-sticker px-3 py-1.5 font-hand text-lg text-foreground leading-none">
                hard hat required
              </div>
              {/* string */}
              <div className="absolute -top-2 left-1/2 w-px h-3 bg-foreground/60" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function SpecimenDrawer({ ores, rotations }: { ores: OreCode[]; rotations: number[] }) {
  return (
    <div
      className="relative p-4 sm:p-5 border-[6px] border-primary-deep/80 shadow-elegant"
      style={{
        background:
          "repeating-linear-gradient(90deg, oklch(0.42 0.09 35) 0px, oklch(0.48 0.10 35) 2px, oklch(0.38 0.08 35) 4px, oklch(0.45 0.09 35) 8px)",
        boxShadow: "inset 0 0 30px oklch(0.2 0.05 30 / 0.6), 4px 4px 0 oklch(0.25 0.06 40 / 0.85)",
      }}
    >
      {/* inner cream backing */}
      <div className="bg-card/40 p-3 sm:p-4 border border-foreground/30">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {ores.map((ore, i) => (
            <div
              key={ore}
              className="bg-[oklch(0.42_0.09_35)] p-1.5 sm:p-2"
              style={{
                boxShadow: "inset 0 0 10px oklch(0.2 0.05 30 / 0.5)",
              }}
            >
              <PermitCard ore={ore} rotation={rotations[i]} />
            </div>
          ))}
        </div>
      </div>

      {/* Drawer footer label */}
      <div className="mt-3 flex items-center justify-between px-2">
        <div className="font-hand text-base sm:text-lg text-card -rotate-1">
          ~ specimen drawer · vol. 02 ~
        </div>
        <div className="bg-card border-2 border-foreground px-2.5 py-0.5 font-display text-xs tracking-widest text-foreground">
          NO. {MINE_STATES.length * 3}
        </div>
      </div>
    </div>
  );
}
