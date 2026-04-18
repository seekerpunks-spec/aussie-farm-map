export type StateCode = "QLD" | "NSW" | "VIC" | "TAS" | "SA" | "WA" | "NT" | "ACT";

export type AustralianState = {
  code: StateCode;
  name: string;
  tagline: string;
  count: number;
};

export const STATES: AustralianState[] = [
  { code: "QLD", name: "Queensland", tagline: "Sunshine, reefs & mango farms", count: 255 },
  { code: "NSW", name: "New South Wales", tagline: "Coastlines, vineyards & shearing sheds", count: 211 },
  { code: "VIC", name: "Victoria", tagline: "Cool climate orchards & berry country", count: 147 },
  { code: "WA", name: "Western Australia", tagline: "Outback stations & wild south-west", count: 134 },
  { code: "SA", name: "South Australia", tagline: "Wine valleys & Murray riverlands", count: 92 },
  { code: "TAS", name: "Tasmania", tagline: "Apple isle, hops & lavender", count: 68 },
  { code: "NT", name: "Northern Territory", tagline: "Cattle stations & mango harvests", count: 41 },
  { code: "ACT", name: "Capital Territory", tagline: "Tablelands & boutique vineyards", count: 9 },
];

export type Farm = {
  id: string;
  name: string;
  region: string;
  state: StateCode;
  work: string[];
  pay: string;
  season: string;
  rating: number;
  reviews: number;
  beds: number;
  vibe: string;
  emoji: string;
};

const NAMES = [
  "Coral Sands", "Whispering Gum", "Golden Mile", "Red Earth", "Wattle Creek",
  "Salt Bush", "Outback Sky", "Driftwood", "Mango Grove", "Sunset Ridge",
  "Lighthouse Bay", "Eucalyptus Hill", "Banksia Flats", "Stockman's Rest", "Tide & Tinder",
  "Boomerang Plains", "Wild Honey", "Coastal Reach", "River Bend", "Cape Horizon",
];

const REGIONS: Record<StateCode, string[]> = {
  QLD: ["Bundaberg", "Cairns", "Mareeba", "Stanthorpe", "Bowen", "Childers"],
  NSW: ["Mudgee", "Griffith", "Byron Hinterland", "Orange", "Coffs Harbour", "Tumut"],
  VIC: ["Mildura", "Shepparton", "Yarra Valley", "Mornington", "Swan Hill", "Bendigo"],
  WA: ["Margaret River", "Carnarvon", "Manjimup", "Kununurra", "Donnybrook", "Esperance"],
  SA: ["Barossa", "Riverland", "McLaren Vale", "Coonawarra", "Adelaide Hills", "Eyre Peninsula"],
  TAS: ["Huon Valley", "Tamar Valley", "Derwent", "Spreyton", "Cradle Coast", "East Coast"],
  NT: ["Katherine", "Darwin Rural", "Mataranka", "Alice Springs", "Daly River", "Tennant Creek"],
  ACT: ["Hall", "Murrumbateman", "Tharwa", "Pialligo"],
};

const WORK_TYPES = [
  ["Fruit picking", "Packing"],
  ["Cattle mustering", "Fencing"],
  ["Vineyard work", "Pruning"],
  ["Hostel duties", "Reception"],
  ["Tractor driving", "Irrigation"],
  ["Berry harvest", "Sorting"],
  ["Olive harvest", "Pressing"],
  ["Dairy", "Calf rearing"],
];

const VIBES = ["Chill & social", "Hard yakka", "Family-run", "Big crew, big party", "Quiet & remote", "Beachside", "Mountain views"];
const EMOJIS = ["🥭", "🍇", "🐄", "🍓", "🌾", "🍊", "🥑", "🐑", "🌶️", "🍎"];

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateFarms(state: StateCode, count: number): Farm[] {
  const rand = seeded(state.charCodeAt(0) * 137 + state.charCodeAt(1));
  const regions = REGIONS[state];
  const out: Farm[] = [];
  const total = Math.min(count, 60); // cap for performance
  for (let i = 0; i < total; i++) {
    const name = `${NAMES[Math.floor(rand() * NAMES.length)]} ${["Farm", "Station", "Estate", "Orchard", "Ranch"][Math.floor(rand() * 5)]}`;
    out.push({
      id: `${state}-${i}`,
      name,
      region: regions[Math.floor(rand() * regions.length)],
      state,
      work: WORK_TYPES[Math.floor(rand() * WORK_TYPES.length)],
      pay: `$${(24 + Math.floor(rand() * 8))}/hr`,
      season: ["Year-round", "Summer", "Autumn", "Spring", "Winter"][Math.floor(rand() * 5)],
      rating: Math.round((3.6 + rand() * 1.4) * 10) / 10,
      reviews: 8 + Math.floor(rand() * 220),
      beds: 4 + Math.floor(rand() * 40),
      vibe: VIBES[Math.floor(rand() * VIBES.length)],
      emoji: EMOJIS[Math.floor(rand() * EMOJIS.length)],
    });
  }
  return out;
}

export function getState(code: StateCode) {
  return STATES.find((s) => s.code === code);
}
