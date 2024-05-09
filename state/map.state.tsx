import type { Flare } from "@/db/schema";
import { atom } from "jotai";

const drawerAtom = atom(false);
const flareSheetOpenAtom = atom(false);
const flareAtom = atom<Flare | null>(null);

export { drawerAtom, flareSheetOpenAtom, flareAtom };
