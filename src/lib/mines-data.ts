import oreIron from "@/assets/ore-iron.png";
import oreGold from "@/assets/ore-gold.png";
import oreCoal from "@/assets/ore-coal.png";
import oreUranium from "@/assets/ore-uranium.png";
import oreCopper from "@/assets/ore-copper.png";
import oreBauxite from "@/assets/ore-bauxite.png";

export type OreCode = "IRON" | "GOLD" | "COAL" | "URANIUM" | "COPPER" | "BAUXITE";

export type Ore = {
  code: OreCode;
  label: string;
  illustration: string;
  permitNo: string;
};

export const ORES: Record<OreCode, Ore> = {
  IRON: { code: "IRON", label: "Iron Ore", illustration: oreIron, permitNo: "№14" },
  GOLD: { code: "GOLD", label: "Gold", illustration: oreGold, permitNo: "№07" },
  COAL: { code: "COAL", label: "Coal", illustration: oreCoal, permitNo: "№22" },
  URANIUM: { code: "URANIUM", label: "Uranium", illustration: oreUranium, permitNo: "№31" },
  COPPER: { code: "COPPER", label: "Copper", illustration: oreCopper, permitNo: "№18" },
  BAUXITE: { code: "BAUXITE", label: "Bauxite", illustration: oreBauxite, permitNo: "№09" },
};

export type MineStateCode = "WA" | "QLD" | "NT" | "NSW" | "SA";

export type MineState = {
  code: MineStateCode;
  name: string;
  established: string;
  regions: string[];
  tagline: string;
  primaryOre: OreCode;
  ores: OreCode[];
  count: number;
};

export const MINE_STATES: MineState[] = [
  {
    code: "WA",
    name: "Western Australia",
    established: "1893",
    regions: ["Pilbara", "Goldfields", "Kimberley"],
    tagline: "iron ore · gold · nickel country",
    primaryOre: "IRON",
    ores: ["IRON", "GOLD", "BAUXITE"],
    count: 342,
  },
  {
    code: "QLD",
    name: "Queensland",
    established: "1872",
    regions: ["Bowen Basin", "Mount Isa", "Cape York"],
    tagline: "black coal & copper country",
    primaryOre: "COAL",
    ores: ["COAL", "COPPER", "BAUXITE"],
    count: 287,
  },
  {
    code: "NT",
    name: "Northern Territory",
    established: "1906",
    regions: ["Tanami", "McArthur River", "Gove"],
    tagline: "uranium · bauxite · zinc frontier",
    primaryOre: "URANIUM",
    ores: ["URANIUM", "BAUXITE", "GOLD"],
    count: 124,
  },
  {
    code: "NSW",
    name: "New South Wales",
    established: "1851",
    regions: ["Hunter Valley", "Cobar", "Broken Hill"],
    tagline: "thermal coal & silver lode",
    primaryOre: "COAL",
    ores: ["COAL", "COPPER", "GOLD"],
    count: 256,
  },
  {
    code: "SA",
    name: "South Australia",
    established: "1841",
    regions: ["Olympic Dam", "Iron Triangle", "Eyre Peninsula"],
    tagline: "copper · uranium · iron crescent",
    primaryOre: "COPPER",
    ores: ["COPPER", "URANIUM", "IRON"],
    count: 138,
  },
];

export type MineSite = {
  id: string;
  name: string;
  region: string;
  state: MineStateCode;
  ore: OreCode;
  pay: string;
  roster: "FIFO" | "Residential" | "DIDO";
  rosterPattern: string;
  beds: number;
  rating: number;
  permitNo: string;
};

const SITE_NAMES = [
  "Red Dog", "Iron Knob", "Mount Whaleback", "Yandi Junction", "Newman Range",
  "Telfer Deep", "Cloncurry Lode", "Olympic Reach", "Coronation Hill", "Jabiluka Flats",
  "Ranger Pit", "Argyle Ridge", "Tom Price", "Paraburdoo", "Cadia East",
  "Northparkes", "Mount Owen", "Bengalla", "Drayton South", "Ulan West",
];

const ROSTERS: Array<"FIFO" | "Residential" | "DIDO"> = ["FIFO", "Residential", "DIDO"];
const PATTERNS = ["2/1", "8/6", "14/7", "4/3", "9/5"];

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateMineSites(state: MineStateCode, count: number): MineSite[] {
  const meta = MINE_STATES.find((s) => s.code === state)!;
  const rand = seeded(state.charCodeAt(0) * 191 + state.charCodeAt(1) * 7);
  const out: MineSite[] = [];
  const total = Math.min(count, 18);
  for (let i = 0; i < total; i++) {
    const ore = meta.ores[Math.floor(rand() * meta.ores.length)];
    out.push({
      id: `${state}-mine-${i}`,
      name: SITE_NAMES[Math.floor(rand() * SITE_NAMES.length)] + " " + ["Mine", "Pit", "Lode", "Operation", "Field"][Math.floor(rand() * 5)],
      region: meta.regions[Math.floor(rand() * meta.regions.length)],
      state,
      ore,
      pay: `$${38 + Math.floor(rand() * 18)}/hr`,
      roster: ROSTERS[Math.floor(rand() * ROSTERS.length)],
      rosterPattern: PATTERNS[Math.floor(rand() * PATTERNS.length)],
      beds: 40 + Math.floor(rand() * 280),
      rating: Math.round((3.8 + rand() * 1.2) * 10) / 10,
      permitNo: `№${(100 + Math.floor(rand() * 899))}`,
    });
  }
  return out;
}

export function getMineState(code: MineStateCode) {
  return MINE_STATES.find((s) => s.code === code);
}

export const TOTAL_MINE_SITES = MINE_STATES.reduce((s, x) => s + x.count, 0);
