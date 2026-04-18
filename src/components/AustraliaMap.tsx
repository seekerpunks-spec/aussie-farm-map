import { useState } from "react";
import mapBg from "@/assets/map-illustration.jpg";
import { STATES, type StateCode } from "@/lib/farms-data";

/**
 * Hand-drawn map of Australia (illustrated JPG) with absolute-positioned
 * hotspot pins for each state. Coordinates are % relative to the image box.
 */
const HOTSPOTS: Record<StateCode, { x: number; y: number; rotate: number }> = {
  WA:  { x: 28, y: 50, rotate: -4 },
  NT:  { x: 47, y: 38, rotate: 2 },
  SA:  { x: 53, y: 62, rotate: -3 },
  QLD: { x: 68, y: 42, rotate: 3 },
  NSW: { x: 75, y: 62, rotate: -2 },
  VIC: { x: 70, y: 73, rotate: 4 },
  ACT: { x: 79, y: 70, rotate: 0 },
  TAS: { x: 71, y: 88, rotate: -5 },
};

type Props = {
  selected: StateCode | null;
  onSelect: (code: StateCode) => void;
};

export function AustraliaMap({ selected, onSelect }: Props) {
  const [hover, setHover] = useState<StateCode | null>(null);
  const active = hover ?? selected;
  const activeState = active ? STATES.find((s) => s.code === active) : null;

  return (
    <div className="relative w-full">
      {/* Sticker frame around the map */}
      <div className="relative rounded-[28px] bg-card border-[3px] border-foreground shadow-sticker overflow-hidden">
        {/* Tape on top */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-sun/80 rotate-[-2deg] z-20 border border-foreground/20" />
        <div className="absolute -top-2 right-8 w-20 h-6 bg-primary/60 rotate-[6deg] z-20 border border-foreground/20" />

        {/* Map image */}
        <div className="relative aspect-square w-full">
          <img
            src={mapBg}
            alt="Hand-drawn map of Australia"
            className="w-full h-full object-cover select-none pointer-events-none"
            draggable={false}
          />

          {/* Subtle paper grain overlay */}
          <div className="absolute inset-0 bg-paper-noise opacity-40 mix-blend-multiply pointer-events-none" />

          {/* Hotspots */}
          {STATES.map((s, i) => {
            const pos = HOTSPOTS[s.code];
            const isHover = hover === s.code;
            const isSelected = selected === s.code;
            const isActive = isHover || isSelected;
            return (
              <button
                key={s.code}
                onMouseEnter={() => setHover(s.code)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onSelect(s.code)}
                className="group absolute -translate-x-1/2 -translate-y-1/2 outline-none"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                  animation: `float-up 0.6s var(--ease-out-soft) ${0.2 + i * 0.07}s both`,
                }}
                aria-label={`${s.name} — ${s.count} farms`}
              >
                {/* Pulse ring */}
                <span className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-primary/40 animate-pulse-ring" />

                {/* Sticker pin */}
                <div
                  className="relative grid place-items-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[3px] border-foreground bg-card transition-all duration-300"
                  style={{
                    transform: `rotate(${pos.rotate}deg) scale(${isActive ? 1.18 : 1})`,
                    backgroundColor: isSelected
                      ? "var(--accent)"
                      : isHover
                        ? "var(--primary)"
                        : "var(--card)",
                    boxShadow: isActive
                      ? "5px 5px 0 oklch(0.25 0.06 40 / 0.85)"
                      : "3px 3px 0 oklch(0.25 0.06 40 / 0.85)",
                  }}
                >
                  <div className="text-center leading-none">
                    <div
                      className="font-display text-[10px] sm:text-[11px]"
                      style={{ color: isActive ? "var(--primary-foreground)" : "var(--foreground)" }}
                    >
                      {s.code}
                    </div>
                    <div
                      className="font-display text-base sm:text-lg mt-0.5"
                      style={{ color: isActive ? "var(--primary-foreground)" : "var(--foreground)" }}
                    >
                      {s.count}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Floating handwritten caption */}
      <div className="absolute -bottom-5 left-6 sm:left-10 rotate-[-3deg] z-30">
        <div className="bg-sun border-2 border-foreground px-3 py-1 shadow-sticker font-hand text-xl sm:text-2xl text-foreground">
          tap a state →
        </div>
      </div>

      {/* Hover info — handwritten note style */}
      <div
        className="absolute -bottom-2 right-2 sm:right-6 rotate-[2deg] z-30 transition-all duration-300"
        style={{ opacity: activeState ? 1 : 0, transform: activeState ? "rotate(2deg) translateY(0)" : "rotate(2deg) translateY(8px)" }}
      >
        {activeState && (
          <div className="bg-card border-2 border-foreground px-4 py-2 shadow-sticker max-w-[220px]">
            <div className="font-display text-base text-primary leading-tight">{activeState.name}</div>
            <div className="font-hand text-lg text-foreground/80 leading-tight">{activeState.tagline}</div>
          </div>
        )}
      </div>
    </div>
  );
}
