import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowRight } from "lucide-react";
import { STATES } from "@/lib/farms-data";
import heroSurf from "@/assets/hero-surf.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Driftwork — The Aussie Farm Atlas" },
      { name: "description", content: "A hand-drawn map-first guide to working hostels and farms across Australia. Find your next 88 days." },
      { property: "og:title", content: "Driftwork — The Aussie Farm Atlas" },
      { property: "og:description", content: "A hand-drawn map-first guide to working farms across Australia." },
      { property: "og:image", content: heroSurf },
    ],
  }),
  component: Home,
});

function Home() {
  const total = STATES.reduce((s, x) => s + x.count, 0);
  return (
    <div className="min-h-screen bg-gradient-hero">
      <SiteHeader />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-center">
          <div>
            <div className="font-hand text-2xl text-primary-deep rotate-[-2deg] inline-block animate-float-up">
              ~ est. on the road ~
            </div>
            <h1 className="mt-2 font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.9] text-foreground animate-float-up" style={{ animationDelay: "0.1s" }}>
              Find your
              <br />
              next <span className="text-primary">88 days</span>
              <br />
              <span className="text-accent">down under.</span>
            </h1>
            <p className="mt-6 font-serif-d italic text-xl text-foreground/75 max-w-md animate-float-up" style={{ animationDelay: "0.2s" }}>
              A hand-drawn atlas of {total}+ working hostels and farms across Australia — built for backpackers chasing sun, surf and second-year visas.
            </p>
            <div className="mt-8 animate-float-up" style={{ animationDelay: "0.3s" }}>
              <Link
                to="/farms"
                className="inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background font-display text-sm uppercase tracking-widest border-2 border-foreground shadow-sticker hover:bg-primary hover:-translate-y-0.5 transition-all"
              >
                Open the atlas <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="ml-4 font-hand text-xl text-primary-deep">→ tap a state, find your spot</span>
            </div>
          </div>
          <div className="relative animate-float-up" style={{ animationDelay: "0.15s" }}>
            <div className="bg-card border-[3px] border-foreground shadow-sticker p-3 rotate-[2deg]">
              <img
                src={heroSurf}
                alt="Vintage Australian sunset surf scene"
                width={1920}
                height={1080}
                className="w-full aspect-video object-cover border-2 border-foreground"
              />
              <div className="mt-3 px-2 flex items-center justify-between">
                <span className="font-hand text-xl text-foreground">~ somewhere on the east coast ~</span>
                <span className="font-display text-xs uppercase tracking-widest text-primary-deep">vol. 01</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-sun border-2 border-foreground px-3 py-1 font-hand text-xl rotate-[-6deg] shadow-sticker">
              good vibes only
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
