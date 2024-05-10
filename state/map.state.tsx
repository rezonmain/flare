import type { GeoZ } from "@/types/geo.types";
import { atom } from "jotai";

const mapCenterAtom = atom<GeoZ>({ lat: 0, lng: 0, z: 0 });

export { mapCenterAtom };
