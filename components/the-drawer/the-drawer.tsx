import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useAtom, drawerAtom, useDrawer } from "@/state";

const TheDrawer: React.FC = () => {
  const { closeDrawer } = useDrawer();
  const [{ open, component }] = useAtom(drawerAtom);
  /** FIX THIS?? it calls change when in renders???? */
  // const handleOpenChange = useCallback(
  //   () => setDrawer((prev) => ({ ...prev, open: false })),
  //   [setDrawer]
  // );

  return (
    <Drawer open={open} onClose={closeDrawer}>
      <DrawerContent>{component}</DrawerContent>
    </Drawer>
  );
};

export { TheDrawer };
