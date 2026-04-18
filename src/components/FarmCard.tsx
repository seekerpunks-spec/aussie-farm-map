import type { Farm } from "@/lib/farms-data";
import { Star, MapPin, Bed, DollarSign } from "lucide-react";

const ROTATIONS = ["-1.2deg", "0.8deg", "-0.5deg", "1.5deg", "-1deg", "0.3deg"];

export function FarmCard({ farm, index }: { farm: Farm; index: number }) {
  const rotate = ROTATIONS[index % ROTATIONS.length];
  return (
    <article
      className="group relative bg-card border-2 border-foreground shadow-sticker hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 hover:rotate-0"
      style={{
        transform: `rotate(${rotate})`,
        animation: `float-up 0.5s var(--ease-out-soft) ${index * 0.04}s both`,
      }}
    >
      {/* Polaroid header */}
      <div className="relative h-28 bg-gradient-sunset overflow-hidden border-b-2 border-foreground">
        {/* Sun rays */}
        <div className="absolute inset-0 opacity-50" style={{
          backgroundImage: "repeating-conic-gradient(from 0deg at 80% 110%, oklch(1 0 0 / 0.18) 0deg 6deg, transparent 6deg 18deg)"
        }} />
        {/* Stamp */}
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-card border-2 border-foreground font-display text-[10px] tracking-wider rotate-[-4deg] shadow-sticker">
          {farm.state}
        </div>
        {/* Rating sticker */}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-card border-2 border-foreground rotate-[3deg] shadow-sticker">
          <Star className="w-3 h-3 fill-primary text-primary" />
          <span className="font-display text-xs text-foreground">{farm.rating}</span>
        </div>
        {/* Big emoji "stamp" */}
        <div className="absolute bottom-2 right-3 text-5xl drop-shadow-lg" style={{ filter: "saturate(1.2)" }}>
          {farm.emoji}
        </div>
      </div>

      <div className="p-4 pt-3 bg-card relative">
        {/* Tape strip */}
        <div className="absolute -top-2 left-6 w-12 h-4 bg-accent/60 border border-foreground/30 rotate-[-3deg]" />

        <h3 className="font-display text-lg leading-tight text-foreground">
          {farm.name}
        </h3>
        <p className="mt-0.5 flex items-center gap-1 font-hand text-base text-primary-deep">
          <MapPin className="w-3.5 h-3.5" /> {farm.region}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {farm.work.map((w) => (
            <span key={w} className="px-2 py-0.5 border border-foreground/40 bg-secondary text-foreground text-[11px] font-semibold uppercase tracking-wider">
              {w}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t-2 border-dashed border-foreground/30 grid grid-cols-3 gap-2 text-[11px]">
          <div>
            <div className="flex items-center gap-1 text-muted-foreground uppercase tracking-wider"><DollarSign className="w-3 h-3" />Pay</div>
            <div className="font-display text-base text-primary mt-0.5">{farm.pay}</div>
          </div>
          <div>
            <div className="flex items-center gap-1 text-muted-foreground uppercase tracking-wider"><Bed className="w-3 h-3" />Beds</div>
            <div className="font-display text-base text-foreground mt-0.5">{farm.beds}</div>
          </div>
          <div>
            <div className="text-muted-foreground uppercase tracking-wider">Season</div>
            <div className="font-display text-base text-foreground mt-0.5">{farm.season}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-hand text-lg text-accent">"{farm.vibe}"</span>
          <button className="font-display text-xs uppercase tracking-widest text-foreground border-b-2 border-foreground hover:text-primary hover:border-primary transition-colors">
            View →
          </button>
        </div>
      </div>
    </article>
  );
}
