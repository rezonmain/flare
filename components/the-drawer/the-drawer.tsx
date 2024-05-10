import { useCallback } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useAtom, drawerAtom } from "@/state";

const TheDrawer: React.FC = () => {
  const [{ open, component }, setDrawer] = useAtom(drawerAtom);
  const handleOpenChange = useCallback(
    () => setDrawer((prev) => ({ ...prev, open: false })),
    [setDrawer]
  );

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>{component}</DrawerContent>
    </Drawer>
  );
};

export { TheDrawer };
