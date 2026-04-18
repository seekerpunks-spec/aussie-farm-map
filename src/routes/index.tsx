import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { STATES } from "@/lib/farms-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Driftwork — The Aus Farm Atlas for Backpackers" },
      { name: "description", content: "Map-first discovery of working hostels and farms across Australia. Find your next 88 days." },
    ],
  }),
  component: Home,
});

function Home() {
  const total = STATES.reduce((s, x) => s + x.count, 0);
  return (
    <div className="min-h-screen bg-gradient-hero">
      <SiteHeader />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/80 border border-border text-xs font-semibold text-primary-deep animate-float-up">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          {total.toLocaleString()}+ farms across the continent
        </div>
        <h1 className="mt-6 text-5xl sm:text-7xl font-extrabold tracking-tight text-foreground animate-float-up" style={{ animationDelay: "0.1s" }}>
          Find your next
          <br />
          <span className="bg-gradient-ocean bg-clip-text text-transparent">88 days</span> down under.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto animate-float-up" style={{ animationDelay: "0.2s" }}>
          A map-first atlas of working hostels and farms across Australia — built for backpackers chasing sun, surf and second-year visas.
        </p>
        <div className="mt-10 flex items-center justify-center gap-3 animate-float-up" style={{ animationDelay: "0.3s" }}>
          <Link
            to="/farms"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-ocean text-primary-foreground font-bold shadow-glow hover:shadow-elegant hover:scale-[1.02] transition-all"
          >
            <MapPin className="w-4 h-4" /> Explore the map <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}
