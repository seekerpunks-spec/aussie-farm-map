import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { AustraliaMap } from "@/components/AustraliaMap";
import { FarmCard } from "@/components/FarmCard";
import { STATES, generateFarms, getState, type StateCode } from "@/lib/farms-data";
import { ArrowLeft, Search } from "lucide-react";
import { STATE_IMAGES, STATE_CAPTIONS } from "@/lib/state-images";

export const Route = createFileRoute("/farms")({
  head: () => ({
    meta: [
      { title: "Farm List — Driftwork Aussie Farm Atlas" },
      { name: "description", content: "A hand-drawn atlas of working hostels and farms across every Australian state." },
      { property: "og:title", content: "Farm List — Driftwork" },
      { property: "og:description", content: "Map-first discovery of Australian farm work, state by state." },
    ],
  }),
  component: FarmListPage,
});

function FarmListPage() {
  const [selected, setSelected] = useState<StateCode | null>(null);
  const [query, setQuery] = useState("");

  const state = selected ? getState(selected) : null;
  const farms = useMemo(() => (selected ? generateFarms(selected, state?.count ?? 0) : []), [selected, state?.count]);
  const filtered = useMemo(() => {
    if (!query.trim()) return farms;
    const q = query.toLowerCase();
    return farms.filter(
      (f) => f.name.toLowerCase().includes(q) || f.region.toLowerCase().includes(q) || f.work.some((w) => w.toLowerCase().includes(q)),
    );
  }, [farms, query]);

  const totalFarms = STATES.reduce((s, x) => s + x.count, 0);

  return (
    <div className="min-h-screen bg-gradient-hero">
      <SiteHeader />

      {!selected ? (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto animate-float-up">
            <div className="inline-block font-hand text-2xl text-primary-deep rotate-[-2deg]">
              ~ chapter one ~
            </div>
            <h1 className="mt-2 font-display text-5xl sm:text-7xl leading-[0.95] text-foreground">
              The Aussie
              <br />
              <span className="text-primary">Farm Atlas</span>
            </h1>
            <p className="mt-4 font-serif-d italic text-lg sm:text-xl text-foreground/70">
              {totalFarms} working farms · 8 states · one wild continent
            </p>
          </div>

          {/* Map */}
          <div className="mt-10 sm:mt-14 max-w-3xl mx-auto relative">
            <AustraliaMap selected={selected} onSelect={setSelected} />
          </div>

          {/* States as ticket stubs */}
          <div className="mt-20 sm:mt-24">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-foreground/30" />
              <span className="font-hand text-2xl text-primary-deep rotate-[-2deg]">or pick from the list</span>
              <div className="h-px flex-1 bg-foreground/30" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATES.map((s, i) => (
                <button
                  key={s.code}
                  onClick={() => setSelected(s.code)}
                  className="group relative text-left bg-card border-2 border-foreground shadow-sticker hover:shadow-elegant hover:-translate-y-1 transition-all p-4"
                  style={{
                    animation: `float-up 0.5s var(--ease-out-soft) ${0.3 + i * 0.05}s both`,
                    transform: `rotate(${i % 2 === 0 ? "-0.8deg" : "0.8deg"})`,
                  }}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-xs uppercase tracking-widest text-primary">{s.code}</span>
                    <span className="font-display text-3xl text-foreground group-hover:text-primary transition-colors">{s.count}</span>
                  </div>
                  <div className="mt-1 font-display text-base text-foreground leading-tight">{s.name}</div>
                  <div className="font-hand text-base text-foreground/60 leading-tight mt-0.5">{s.tagline}</div>
                  {/* perforated edge */}
                  <div className="absolute -bottom-1 left-0 right-0 h-1.5 bg-[radial-gradient(circle,var(--background)_1.5px,transparent_2px)] bg-[length:8px_4px]" />
                </button>
              ))}
            </div>
          </div>
        </main>
      ) : (
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 animate-float-up">
          {/* State header — postcard style */}
          <button
            onClick={() => { setSelected(null); setQuery(""); }}
            className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-widest text-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to map
          </button>

          <div className="relative bg-card border-2 border-foreground shadow-sticker p-5 sm:p-8 rotate-[-0.5deg]">
            <div className="absolute -top-3 right-8 w-24 h-6 bg-sun/80 rotate-[4deg] border border-foreground/30" />
            <div className="grid sm:grid-cols-[1fr_180px] gap-6 items-center">
              <div>
                <div className="font-hand text-2xl text-primary-deep">postcard from</div>
                <h1 className="font-display text-5xl sm:text-6xl text-foreground leading-[0.9]">{state!.name}</h1>
                <p className="mt-2 font-serif-d italic text-lg text-foreground/70">{state!.tagline}</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-4xl text-primary">{state!.count}</span>
                  <span className="font-hand text-xl text-foreground/70">farms · showing {filtered.length}</span>
                </div>
              </div>
              <div className="hidden sm:block relative">
                <img
                  key={state!.code}
                  src={STATE_IMAGES[state!.code]}
                  alt={`Vintage photo of ${state!.name}`}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="w-full aspect-square object-cover border-2 border-foreground shadow-polaroid rotate-[3deg] animate-float-up"
                />
                <div className="absolute -bottom-2 left-2 right-2 text-center font-hand text-base text-foreground bg-card py-0.5 border border-foreground/30 rotate-[3deg]">
                  {STATE_CAPTIONS[state!.code]}
                </div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-8 relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search farms, regions, work..."
              className="w-full pl-9 pr-4 py-2.5 bg-card border-2 border-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-sans text-sm shadow-sticker"
            />
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="mt-16 text-center font-hand text-2xl text-foreground/60">
              no farms match "{query}". try something else?
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filtered.map((farm, i) => (
                <FarmCard key={farm.id} farm={farm} index={i} />
              ))}
            </div>
          )}
        </main>
      )}
    </div>
  );
}
