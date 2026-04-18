import { useState } from "react";
import { STATES, type StateCode } from "@/lib/farms-data";

/**
 * Stylised, recognisable Australia map.
 * Each state is a polygon roughly placed on a 1000x800 canvas.
 * Not geographically perfect — designed for a premium, readable hero map.
 */
const STATE_PATHS: Record<StateCode, { d: string; label: [number, number]; badge: [number, number] }> = {
  WA: {
    d: "M 80,260 L 80,500 Q 90,560 140,600 L 220,640 L 320,650 L 420,640 L 420,260 L 380,200 L 280,170 L 180,180 L 110,210 Z",
    label: [230, 430],
    badge: [230, 470],
  },
  NT: {
    d: "M 420,170 L 420,500 L 560,500 L 560,200 L 520,170 L 460,160 Z",
    label: [490, 320],
    badge: [490, 360],
  },
  SA: {
    d: "M 420,500 L 420,640 L 460,680 L 600,680 L 660,640 L 660,520 L 660,500 L 560,500 Z",
    label: [540, 590],
    badge: [540, 625],
  },
  QLD: {
    d: "M 560,200 L 560,500 L 660,500 L 770,470 L 830,400 L 870,310 L 870,230 L 800,180 L 700,160 L 600,170 Z",
    label: [720, 320],
    badge: [720, 360],
  },
  NSW: {
    d: "M 660,500 L 660,640 L 800,650 L 870,610 L 870,520 L 830,490 L 770,470 L 660,500 Z",
    label: [770, 565],
    badge: [770, 600],
  },
  VIC: {
    d: "M 600,680 L 660,640 L 800,650 L 820,690 L 760,720 L 660,720 Z",
    label: [710, 685],
    badge: [710, 705],
  },
  ACT: {
    d: "M 805,615 m -10,0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0",
    label: [870, 615],
    badge: [870, 615],
  },
  TAS: {
    d: "M 700,760 L 760,760 L 770,800 L 720,810 L 690,790 Z",
    label: [730, 785],
    badge: [730, 800],
  },
};

const STATE_ORDER: StateCode[] = ["WA", "NT", "SA", "QLD", "NSW", "VIC", "TAS", "ACT"];

type Props = {
  selected: StateCode | null;
  onSelect: (code: StateCode) => void;
};

export function AustraliaMap({ selected, onSelect }: Props) {
  const [hover, setHover] = useState<StateCode | null>(null);

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 1000 850"
        className="w-full h-auto drop-shadow-[0_30px_60px_oklch(0.42_0.10_220_/_0.18)]"
        role="img"
        aria-label="Map of Australia — click a state to see farms"
      >
        <defs>
          <linearGradient id="oceanGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.78 0.13 200)" />
            <stop offset="100%" stopColor="oklch(0.52 0.12 220)" />
          </linearGradient>
          <linearGradient id="hoverGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.82 0.14 50)" />
            <stop offset="100%" stopColor="oklch(0.65 0.18 30)" />
          </linearGradient>
          <linearGradient id="selectedGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.18 35)" />
            <stop offset="100%" stopColor="oklch(0.55 0.18 25)" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* faint ocean rings */}
        <g opacity="0.15">
          <ellipse cx="475" cy="450" rx="460" ry="380" fill="none" stroke="oklch(0.62 0.12 200)" strokeWidth="1.5" strokeDasharray="4 8" />
          <ellipse cx="475" cy="450" rx="420" ry="340" fill="none" stroke="oklch(0.62 0.12 200)" strokeWidth="1" strokeDasharray="2 10" />
        </g>

        {/* States */}
        {STATE_ORDER.map((code, i) => {
          const isHover = hover === code;
          const isSelected = selected === code;
          const fill = isSelected
            ? "url(#selectedGrad)"
            : isHover
              ? "url(#hoverGrad)"
              : "url(#oceanGrad)";
          return (
            <path
              key={code}
              d={STATE_PATHS[code].d}
              fill={fill}
              stroke="oklch(1 0 0 / 0.7)"
              strokeWidth={isSelected ? 3 : 1.5}
              className="cursor-pointer transition-all duration-300"
              style={{
                filter: isHover || isSelected ? "url(#softGlow)" : undefined,
                transformOrigin: "center",
                transform: isHover ? "translateY(-2px)" : undefined,
                animation: `float-up 0.6s var(--ease-out-soft) ${i * 0.08}s both`,
              }}
              onMouseEnter={() => setHover(code)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onSelect(code)}
            />
          );
        })}

        {/* Labels & badges */}
        {STATE_ORDER.map((code, i) => {
          const state = STATES.find((s) => s.code === code)!;
          const [lx, ly] = STATE_PATHS[code].label;
          const [bx, by] = STATE_PATHS[code].badge;
          const isSelected = selected === code;
          const isHover = hover === code;
          const isACT = code === "ACT";
          return (
            <g
              key={`label-${code}`}
              style={{ animation: `float-up 0.6s var(--ease-out-soft) ${0.4 + i * 0.08}s both` }}
              className="pointer-events-none"
            >
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                className="select-none"
                fill="oklch(1 0 0)"
                fontSize={isACT ? 14 : 22}
                fontWeight={700}
                style={{ letterSpacing: "0.05em" }}
              >
                {code}
              </text>
              {/* Badge */}
              {!isACT && (
                <g transform={`translate(${bx}, ${by})`}>
                  {(isHover || isSelected) && (
                    <circle r="26" fill="oklch(1 0 0 / 0.4)" className="animate-pulse-ring" />
                  )}
                  <circle
                    r="22"
                    fill="oklch(1 0 0)"
                    stroke={isSelected ? "oklch(0.72 0.18 35)" : "oklch(0.62 0.12 200)"}
                    strokeWidth="2.5"
                    style={{ filter: "drop-shadow(0 4px 10px oklch(0.42 0.10 220 / 0.35))" }}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="14"
                    fontWeight="800"
                    fill="oklch(0.22 0.04 230)"
                  >
                    {state.count}
                  </text>
                </g>
              )}
              {isACT && (
                <text x={lx} y={ly + 14} textAnchor="middle" fontSize="11" fontWeight="700" fill="oklch(0.22 0.04 230)">
                  {state.count}
                </text>
              )}
            </g>
          );
        })}

        {/* Compass */}
        <g transform="translate(120, 120)" className="pointer-events-none" opacity="0.7">
          <circle r="28" fill="oklch(1 0 0 / 0.85)" stroke="oklch(0.62 0.12 200)" strokeWidth="1.5" />
          <text textAnchor="middle" y="-10" fontSize="9" fontWeight="700" fill="oklch(0.42 0.10 220)">N</text>
          <path d="M 0,-18 L 4,0 L 0,4 L -4,0 Z" fill="oklch(0.72 0.18 35)" />
          <path d="M 0,18 L 4,0 L 0,-4 L -4,0 Z" fill="oklch(0.62 0.12 200)" opacity="0.5" />
        </g>
      </svg>

      {/* Hover info chip */}
      <div
        className="absolute top-4 right-4 rounded-2xl bg-card/90 backdrop-blur px-4 py-3 shadow-elegant border border-border min-w-[200px] transition-all duration-300"
        style={{ opacity: hover || selected ? 1 : 0.5 }}
      >
        {(() => {
          const code = hover ?? selected;
          if (!code) return <p className="text-xs text-muted-foreground">Hover a state to explore</p>;
          const s = STATES.find((x) => x.code === code)!;
          return (
            <>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-bold text-foreground">{s.name}</span>
                <span className="text-xs font-mono text-primary">{s.code}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{s.tagline}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-2xl font-extrabold bg-gradient-ocean bg-clip-text text-transparent">{s.count}</span>
                <span className="text-xs text-muted-foreground">farms</span>
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}
