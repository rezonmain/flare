import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { mapCenterAtom } from "@/state/map.state";
import {
  drawerAtom,
  sheetAtom,
  type DrawerAtomProps,
  type SheetAtomProps,
} from "@/state/ui.state";
import { userAtom } from "@/state/user.state";

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
    setSheet((prev) => ({ ...prev, open: false, side: null }));
  }, [setSheet]);

  return { openSheet, closeSheet };
};

const useUser = () => {
  const session = useSession();
  const user = useAtomValue(userAtom);
  return { ...user, session };
};

export {
  useAtom,
  useAtomValue,
  useSetAtom,
  useMapCenter,
  useDrawer,
  useSheet,
  useUser,
};
