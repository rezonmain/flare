import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAtom, sheetAtom } from "@/state";

const TheSheet: React.FC = () => {
  const [{ open, side, component }, setSheet] = useAtom(sheetAtom);
  const handleOpenChange = () => setSheet((prev) => ({ ...prev, open: false }));

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side={side}>{component}</SheetContent>
    </Sheet>
  );
};

export { TheSheet };
