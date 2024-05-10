import { useCallback } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { mapCenterAtom } from "@/state/map.state";
import {
  drawerAtom,
  sheetAtom,
  type DrawerAtomProps,
  type SheetAtomProps,
} from "@/state/ui.state";

/**
 * Get the current map center
 * @returns
 */
const useMapCenter = () => useAtomValue(mapCenterAtom);

/**
 * Expose handlers to manage the drawer state
 * @returns
 */
const useDrawer = () => {
  const setDrawer = useSetAtom(drawerAtom);

  const openDrawer = useCallback(
    (props: Omit<DrawerAtomProps, "open">) => {
      setDrawer({ ...props, open: true });
    },
    [setDrawer]
  );

  const closeDrawer = useCallback(() => {
    setDrawer((prev) => ({ ...prev, open: false }));
  }, [setDrawer]);

  return { openDrawer, closeDrawer };
};

const useSheet = () => {
  const setSheet = useSetAtom(sheetAtom);

  const openSheet = useCallback(
    (props: Omit<SheetAtomProps, "open">) => {
      setSheet({ ...props, open: true });
    },
    [setSheet]
  );

  const closeSheet = useCallback(() => {
    setSheet((prev) => ({ ...prev, open: false }));
  }, [setSheet]);

  return { openSheet, closeSheet };
};

export { useAtom, useAtomValue, useSetAtom, useMapCenter, useDrawer, useSheet };
