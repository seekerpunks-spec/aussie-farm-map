import type { StateCode } from "./farms-data";
import qld from "@/assets/state-qld.jpg";
import nsw from "@/assets/state-nsw.jpg";
import vic from "@/assets/state-vic.jpg";
import wa from "@/assets/state-wa.jpg";
import sa from "@/assets/state-sa.jpg";
import tas from "@/assets/state-tas.jpg";
import nt from "@/assets/state-nt.jpg";
import act from "@/assets/state-act.jpg";

export const STATE_IMAGES: Record<StateCode, string> = {
  QLD: qld,
  NSW: nsw,
  VIC: vic,
  WA: wa,
  SA: sa,
  TAS: tas,
  NT: nt,
  ACT: act,
};

export const STATE_CAPTIONS: Record<StateCode, string> = {
  QLD: "tropical north · reefs & palms",
  NSW: "byron headland · surf & lighthouses",
  VIC: "yarra valley · vines & rolling hills",
  WA: "great southern · cliffs & turquoise",
  SA: "barossa · stone cellars & gold leaves",
  TAS: "huon valley · apples & cool air",
  NT: "red centre · uluru & spinifex",
  ACT: "tablelands · lavender & gum trees",
};
