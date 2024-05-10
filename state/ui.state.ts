import { atom } from "jotai";

type DrawerAtomProps = {
  open: boolean;
  name: string;
  component: React.ReactNode;
};
const drawerAtom = atom<DrawerAtomProps>({
  open: false,
  name: "",
  component: null,
});

type SheetAtomProps = {
  open: boolean;
  component: React.ReactNode;
  name: string;
  side: "top" | "bottom" | "left" | "right" | null | undefined;
};
const sheetAtom = atom<SheetAtomProps>({
  open: false,
  component: null,
  name: "",
  side: null,
});

export { drawerAtom, sheetAtom, type DrawerAtomProps, type SheetAtomProps };
