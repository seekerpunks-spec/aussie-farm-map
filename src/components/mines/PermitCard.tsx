import { ORES, type OreCode } from "@/lib/mines-data";

type Props = {
  ore: OreCode;
  rotation?: number;
  className?: string;
};

/**
 * A vintage mining permit card — kraft paper with stamped header,
 * circular ink stamp containing an engraving illustration,
 * and "PERMIT 1923 №xx" footer. Used as the base visual unit
 * for the mines specimen drawer.
 */
export function PermitCard({ ore, rotation = 0, className = "" }: Props) {
  const meta = ORES[ore];
  return (
    <div
      className={`relative bg-card border-2 border-foreground/80 shadow-sticker overflow-hidden select-none ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* coffee stain */}
      <div className="pointer-events-none absolute -top-4 -left-3 w-20 h-20 rounded-full bg-primary-deep/15 blur-md" />
      <div className="pointer-events-none absolute bottom-2 right-2 w-12 h-8 rounded-full bg-primary-deep/10 blur-sm" />

      {/* MINING DISTRICT header stamp */}
      <div className="mx-3 mt-3 border-2 border-primary-deep/70 bg-primary/30 py-1.5 text-center">
        <div className="font-display text-[11px] tracking-[0.2em] text-primary-deep leading-none">
          MINING
        </div>
        <div className="font-display text-[11px] tracking-[0.2em] text-primary-deep leading-none mt-0.5">
          DISTRICT
        </div>
      </div>

      {/* Circular ink stamp + engraving */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-center">
        <div className="relative w-full aspect-square max-w-[140px] rounded-full border-2 border-foreground/60 grid place-items-center">
          <img
            src={meta.illustration}
            alt={meta.label}
            loading="lazy"
            className="w-[78%] h-[78%] object-contain mix-blend-multiply"
          />
        </div>
      </div>

      {/* Label */}
      <div className="px-3 text-center">
        <div className="font-display text-2xl text-foreground tracking-wide leading-none">
          {meta.label.toUpperCase()}
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 pt-2 pb-2.5 mt-1 flex items-baseline justify-between border-t border-dashed border-foreground/30 mx-3">
        <span className="font-display text-[10px] tracking-widest text-foreground/70">
          PERMIT 1923
        </span>
        <span className="font-hand text-base text-foreground/70 leading-none">
          {meta.permitNo}
        </span>
      </div>

      {/* torn corner */}
      <div className="pointer-events-none absolute top-0 right-0 w-5 h-5 bg-[conic-gradient(from_135deg_at_100%_0%,transparent_0_25%,var(--background)_25%_100%)]" />
    </div>
  );
}
