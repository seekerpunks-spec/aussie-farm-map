import type { Farm } from "@/lib/farms-data";
import { Star, MapPin, Bed, DollarSign } from "lucide-react";

export function FarmCard({ farm, index }: { farm: Farm; index: number }) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1"
      style={{ animation: `float-up 0.5s var(--ease-out-soft) ${index * 0.04}s both` }}
    >
      {/* Top banner */}
      <div className="relative h-24 bg-gradient-ocean overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, oklch(1 0 0 / 0.4), transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.85 0.15 80 / 0.4), transparent 50%)"
        }} />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-[11px] font-bold text-primary-deep flex items-center gap-1">
          <Star className="w-3 h-3 fill-current text-accent" />
          {farm.rating} <span className="text-muted-foreground font-normal">({farm.reviews})</span>
        </div>
        <div className="absolute -bottom-4 right-4 w-14 h-14 rounded-2xl bg-card flex items-center justify-center text-3xl shadow-soft border border-border">
          {farm.emoji}
        </div>
      </div>

      <div className="p-4 pt-5">
        <h3 className="font-bold text-foreground text-base leading-tight group-hover:text-primary transition-colors">
          {farm.name}
        </h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3 h-3" /> {farm.region}, {farm.state}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {farm.work.map((w) => (
            <span key={w} className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-[11px] font-medium">
              {w}
            </span>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-border grid grid-cols-3 gap-2 text-[11px]">
          <div className="flex flex-col">
            <span className="flex items-center gap-1 text-muted-foreground"><DollarSign className="w-3 h-3" />Pay</span>
            <span className="font-bold text-foreground mt-0.5">{farm.pay}</span>
          </div>
          <div className="flex flex-col">
            <span className="flex items-center gap-1 text-muted-foreground"><Bed className="w-3 h-3" />Beds</span>
            <span className="font-bold text-foreground mt-0.5">{farm.beds}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Season</span>
            <span className="font-bold text-foreground mt-0.5">{farm.season}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-[11px] italic text-accent font-medium">{farm.vibe}</span>
          <button className="text-xs font-semibold text-primary hover:text-primary-deep transition-colors">
            View →
          </button>
        </div>
      </div>
    </article>
  );
}
