import { useCallback } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useAtom, drawerAtom } from "@/state";

const TheDrawer: React.FC = () => {
  const [{ open, component }, setDrawer] = useAtom(drawerAtom);
  const handleOpenChange = useCallback(
    (open: boolean) => setDrawer((prev) => ({ ...prev, open })),
    [setDrawer]
  );

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <div className="max-h-svh overflow-y-auto">{component}</div>
      </DrawerContent>
    </Drawer>
  );
};

export { TheDrawer };
