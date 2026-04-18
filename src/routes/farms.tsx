import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { AustraliaMap } from "@/components/AustraliaMap";
import { FarmCard } from "@/components/FarmCard";
import { STATES, generateFarms, getState, type StateCode } from "@/lib/farms-data";
import { ArrowLeft, Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/farms")({
  head: () => ({
    meta: [
      { title: "Farm List — Discover Australian Farms | Driftwork" },
      { name: "description", content: "Explore working hostels and farms across every Australian state. Tap the map to discover your next adventure." },
      { property: "og:title", content: "Farm List — Driftwork Aus Farm Atlas" },
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
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
          {/* Hero copy */}
          <div className="text-center max-w-2xl mx-auto animate-float-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-card/80 border border-border text-xs font-semibold text-primary-deep">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              {totalFarms.toLocaleString()} farms · 8 states · 1 wild continent
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Pick your <span className="bg-gradient-ocean bg-clip-text text-transparent">patch of paradise</span>
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              Tap a state to dive into its farm scene. From reef-side fruit picks to outback stations — your next adventure is one click away.
            </p>
          </div>

          {/* Map */}
          <div className="mt-8 sm:mt-10 relative rounded-3xl bg-card/60 backdrop-blur p-3 sm:p-6 border border-border shadow-elegant">
            <AustraliaMap selected={selected} onSelect={setSelected} />
          </div>

          {/* State quick list */}
          <div className="mt-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-3">Or jump straight in</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATES.map((s, i) => (
                <button
                  key={s.code}
                  onClick={() => setSelected(s.code)}
                  className="group text-left p-4 rounded-2xl bg-card border border-border hover:border-primary hover:shadow-elegant transition-all hover:-translate-y-0.5"
                  style={{ animation: `float-up 0.5s var(--ease-out-soft) ${0.3 + i * 0.05}s both` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary">{s.code}</span>
                    <span className="text-2xl font-extrabold text-foreground group-hover:text-accent transition-colors">{s.count}</span>
                  </div>
                  <div className="mt-1 font-semibold text-sm text-foreground">{s.name}</div>
                  <div className="text-[11px] text-muted-foreground line-clamp-1">{s.tagline}</div>
                </button>
              ))}
            </div>
          </div>
        </main>
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 animate-float-up">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <button
                onClick={() => { setSelected(null); setQuery(""); }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to map
              </button>
              <div className="mt-3 flex items-center gap-3">
                <span className="font-mono text-xs font-bold px-2 py-1 rounded-md bg-primary text-primary-foreground">{state!.code}</span>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">{state!.name}</h1>
              </div>
              <p className="mt-1 text-muted-foreground">{state!.tagline}</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold bg-gradient-sunset bg-clip-text text-transparent">{state!.count}</span>
                <span className="text-sm text-muted-foreground">farms · showing {filtered.length}</span>
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search farms, regions, work..."
                className="w-full pl-9 pr-4 py-2.5 rounded-full bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
              />
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="mt-12 text-center text-muted-foreground">
              No farms match "{query}". Try a different search.
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
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
