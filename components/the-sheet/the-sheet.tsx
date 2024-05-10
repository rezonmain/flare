import { useCallback } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAtom, sheetAtom } from "@/state";

const TheSheet: React.FC = () => {
  const [{ open, side, component }, setSheet] = useAtom(sheetAtom);
  const handleOpenChange = useCallback(
    () => setSheet((prev) => ({ ...prev, open: false })),
    [setSheet]
  );

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side={side} className="w-full h-dvh overflow-auto">
        {component}
      </SheetContent>
    </Sheet>
  );
};

export { TheSheet };
