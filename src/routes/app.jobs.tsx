import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Filter, Mail, ArrowRight, AlertTriangle } from "lucide-react";
import poster from "@/assets/jobs-poster-70s.jpg";

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

// Live screen-print poster page
function JobsPage() {
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

          <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
            <Step n={1} label="FIND" caption="new listings, refreshed every day" icon={Search} />
            <Step n={2} label="SCREEN" caption="WHV rules, Schedule 1 postcodes" icon={Filter} />
            <Step n={3} label="APPLY" caption="contacts surfaced, drafts ready" icon={Mail} />
          </div>

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

        {/* RIGHT — 70's screenprint poster */}
        <aside
          className="relative animate-float-up"
          style={{ animationDelay: "0.15s" }}
        >
          {/* Tape strips holding the poster on the wall */}
          <div
            className="absolute -top-3 left-10 w-24 h-5 z-20 bg-sun/80 border-x border-foreground/10 shadow-md -rotate-6"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent 0 6px, rgba(255,255,255,0.3) 6px 7px)",
            }}
          />
          <div
            className="absolute -top-3 right-12 w-24 h-5 z-20 bg-primary/50 border-x border-foreground/10 shadow-md rotate-3"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, transparent 0 6px, rgba(255,255,255,0.3) 6px 7px)",
            }}
          />

          {/* Poster frame */}
          <div className="relative border-2 border-foreground shadow-sticker bg-[oklch(0.96_0.04_85)] p-3 sm:p-4 rotate-[-0.8deg]">
            <img
              src={poster}
              alt="Vintage 1970s screenprint of an Australian outback road at sunrise"
              width={1024}
              height={1024}
              className="block w-full h-auto"
            />

            {/* Overlay caption strip — bottom of poster */}
            <div className="absolute left-3 right-3 bottom-3 sm:left-4 sm:right-4 sm:bottom-4 bg-foreground/90 text-background px-4 py-2 flex items-center justify-between gap-3">
              <span className="font-display text-[11px] tracking-[0.25em] uppercase">
                The Long Paddock — Vol. I
              </span>
              <span className="font-hand text-base text-sun">№ 88 / ’26</span>
            </div>
          </div>

          {/* Eligible-today sticker, pinned over the poster */}
          <div className="absolute -bottom-5 -right-3 sm:-right-5 z-30 rotate-[6deg]">
            <div className="bg-accent text-accent-foreground border-2 border-foreground shadow-sticker px-4 py-2.5">
              <div className="font-display text-[10px] uppercase tracking-widest opacity-80">
                Eligible today
              </div>
              <div className="font-display text-3xl leading-none mt-1">550</div>
            </div>
          </div>

          {/* Hand-drawn caption under poster */}
          <p className="mt-8 font-hand text-lg text-primary-deep text-center rotate-[-1deg]">
            ~ somewhere on the east coast ~
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
