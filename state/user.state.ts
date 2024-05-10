import { atom } from "jotai";
import type { MapCapabilities } from "@/constants/map.enum";

type UserAtomProps = {
  capabilities: MapCapabilities[];
  guestName: string;
};

const userAtom = atom<UserAtomProps>({
  capabilities: [],
  guestName: "",
});

export { userAtom };
