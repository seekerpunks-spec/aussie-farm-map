import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Search, Star, Bed } from "lucide-react";
import { useMemo, useState } from "react";
import { generateMineSites, getMineState, ORES, type MineStateCode, type OreCode } from "@/lib/mines-data";

export const Route = createFileRoute("/app/mines/$state")({
  loader: ({ params }) => {
    const code = params.state.toUpperCase() as MineStateCode;
    const state = getMineState(code);
    if (!state) throw notFound();
    return { state };
  },
  head: ({ loaderData }) => {
    const state = loaderData?.state;
    return {
      meta: [
        { title: `${state?.name ?? "State"} mines — FarmBot` },
        { name: "description", content: `${state?.count ?? 0} mining operations across ${state?.regions.join(", ")}.` },
        { property: "og:title", content: `${state?.name} mining district — FarmBot` },
        { property: "og:description", content: `${state?.tagline}. Browse ${state?.count} sites.` },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-gradient-hero">
      <div className="text-center">
        <div className="font-hand text-3xl text-primary-deep">no permit on file</div>
        <h1 className="font-display text-5xl mt-2">Unknown district</h1>
        <Link to="/app/mines/atlas" className="mt-6 inline-block font-display text-sm uppercase tracking-widest text-primary hover:underline">
          ← Back to atlas
        </Link>
      </div>
    </div>
  ),
  component: MineStateDetailPage,
});

function MineStateDetailPage() {
  const { state } = Route.useLoaderData();
  const [query, setQuery] = useState("");
  const sites = useMemo(() => generateMineSites(state.code, state.count), [state.code, state.count]);
  const filtered = useMemo(() => {
    if (!query.trim()) return sites;
    const q = query.toLowerCase();
    return sites.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.region.toLowerCase().includes(q) ||
        s.ore.toLowerCase().includes(q),
    );
  }, [sites, query]);

  const primaryOre = ORES[state.primaryOre as OreCode];

  return (
    <main className="min-h-screen bg-gradient-hero">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 animate-float-up">
        <Link
          to="/app/mines/atlas"
          className="inline-flex items-center gap-1.5 font-display text-xs uppercase tracking-widest text-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to atlas
        </Link>

        {/* Permit document header */}
        <div className="mt-5 grid lg:grid-cols-[1fr_auto] gap-6 items-center">
          <div className="relative bg-card border-2 border-foreground shadow-sticker p-5 sm:p-8 rotate-[-0.5deg]">
            {/* coffee stain */}
            <div className="pointer-events-none absolute -top-3 -left-3 w-24 h-24 rounded-full bg-primary-deep/15 blur-md" />
            <div className="pointer-events-none absolute bottom-3 right-6 w-16 h-10 rounded-full bg-primary-deep/10 blur-sm" />

            <div className="font-hand text-2xl text-primary-deep">permit issued for</div>
            <h1 className="mt-1 font-display text-5xl sm:text-6xl text-foreground leading-[0.9]">
              {state.name}
            </h1>
            <p className="mt-3 font-serif-d italic text-lg text-foreground/70">
              {state.regions.join(" · ")}
            </p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-4xl text-primary">{state.count}</span>
              <span className="font-hand text-xl text-foreground/70">
                sites · showing {filtered.length}
              </span>
            </div>

            {/* PERMIT corner stamp */}
            <div className="absolute -top-3 right-8 bg-sun/90 rotate-[4deg] border border-foreground/40 px-3 py-0.5 font-display text-[10px] tracking-widest">
              PERMIT №{state.code}-{state.established}
            </div>
          </div>

          {/* Circular wax stamp */}
          <div className="relative shrink-0 mx-auto lg:mx-0">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 grid place-items-center">
              {/* outer ring */}
              <div className="absolute inset-0 rounded-full border-[3px] border-primary-deep/70" />
              <div className="absolute inset-2 rounded-full border-2 border-primary-deep/50 border-dashed" />
              {/* circular text */}
              <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full text-primary-deep/80">
                <defs>
                  <path id={`circle-${state.code}`} d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
                </defs>
                <text className="font-display" fontSize="13" letterSpacing="3" fill="currentColor">
                  <textPath href={`#circle-${state.code}`} startOffset="0">
                    {state.name.toUpperCase()} · MINING DISTRICT · EST. {state.established} ·
                  </textPath>
                </text>
              </svg>
              {/* ore engraving */}
              <img
                src={primaryOre.illustration}
                alt={primaryOre.label}
                loading="lazy"
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain mix-blend-multiply"
              />
            </div>
            {/* ribbon */}
            <div className="mt-2 mx-auto max-w-[14rem] bg-primary text-primary-foreground border-2 border-foreground shadow-sticker px-3 py-1 text-center font-hand text-base rotate-[-2deg]">
              {state.tagline}
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-8 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/60" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sites, regions, ore type..."
            className="w-full pl-9 pr-4 py-2.5 bg-card border-2 border-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 font-sans text-sm shadow-sticker"
          />
        </div>

        {/* Sites grid */}
        {filtered.length === 0 ? (
          <div className="mt-16 text-center font-hand text-2xl text-foreground/60">
            no sites match "{query}". try another seam?
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((site, i) => {
              const ore = ORES[site.ore as OreCode];
              const rot = i % 2 === 0 ? -0.6 : 0.6;
              return (
                <article
                  key={site.id}
                  className="relative bg-card border-2 border-foreground shadow-sticker hover:-translate-y-1 hover:shadow-elegant transition-all"
                  style={{
                    transform: `rotate(${rot}deg)`,
                    animation: `float-up 0.5s var(--ease-out-soft) ${0.05 + i * 0.04}s both`,
                  }}
                >
                  {/* Folder tab */}
                  <div
                    className="absolute -top-3 left-5 bg-secondary border-2 border-foreground border-b-0 px-3 py-0.5 font-display text-[10px] tracking-widest text-foreground"
                  >
                    SITE {site.permitNo}
                  </div>

                  <div className="p-5 pt-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-display text-xl text-foreground leading-tight truncate">
                          {site.name}
                        </h3>
                        <div className="font-hand text-lg text-primary-deep mt-0.5">
                          {site.region}
                        </div>
                      </div>
                      <img
                        src={ore.illustration}
                        alt={ore.label}
                        loading="lazy"
                        className="w-14 h-14 object-contain mix-blend-multiply shrink-0 -mt-1"
                      />
                    </div>

                    {/* Ore stamp */}
                    <div className="mt-3 inline-block border-2 border-primary-deep/70 bg-primary/20 px-2 py-0.5 font-display text-[10px] tracking-widest text-primary-deep rotate-[-1.5deg]">
                      {ore.label.toUpperCase()}
                    </div>

                    {/* Stats grid */}
                    <div className="mt-4 grid grid-cols-2 gap-3 pt-3 border-t border-dashed border-foreground/30">
                      <div>
                        <div className="font-hand text-sm text-foreground/60 leading-none">pay</div>
                        <div className="font-display text-lg text-foreground mt-0.5">{site.pay}</div>
                      </div>
                      <div>
                        <div className="font-hand text-sm text-foreground/60 leading-none">roster</div>
                        <div className="font-display text-lg text-foreground mt-0.5">{site.rosterPattern}</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-primary-deep" strokeWidth={2} />
                        <span className="font-sans text-sm text-foreground">{site.beds} beds</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-sun fill-sun" strokeWidth={1.5} />
                        <span className="font-sans text-sm text-foreground">{site.rating}</span>
                      </div>
                    </div>

                    {/* Roster type tag */}
                    <div className="mt-4 flex items-center justify-between">
                      <span
                        className={`font-display text-[10px] tracking-widest px-2 py-1 border-2 ${
                          site.roster === "FIFO"
                            ? "bg-accent/20 border-accent text-accent"
                            : site.roster === "DIDO"
                              ? "bg-sun/30 border-foreground text-foreground"
                              : "bg-primary/20 border-primary-deep text-primary-deep"
                        }`}
                      >
                        {site.roster}
                      </span>
                      <span className="font-hand text-base text-foreground/50">
                        permit 1923
                      </span>
                    </div>
                  </div>

                  {/* Punch hole */}
                  <div className="absolute -top-1 left-9 w-1.5 h-1.5 rounded-full bg-foreground/40" />
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
