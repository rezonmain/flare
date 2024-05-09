import { useAtom, useAtomValue } from "jotai";
import { nil } from "@rezonmain/utils-nil";
import { flareAtom, flareSheetOpenAtom } from "@/state/map.state";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FlareSheetBody } from "@/components/flare-sheet/flare-sheet-body";
import { FLARE_CATEGORY_LABELS } from "@/constants/flare.constants";
import { ClockIcon } from "lucide-react";
import { FlareCountdown } from "@/components/flare-countdown/flare-contdown";

const FlareSheet: React.FC = () => {
  const [open, setOpen] = useAtom(flareSheetOpenAtom);
  const flare = useAtomValue(flareAtom);

  if (nil(flare)) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="w-full h-dvh flex flex-col justify-between overflow-auto"
      >
        <SheetHeader>
          <SheetTitle className="text-left">
            Flare - {FLARE_CATEGORY_LABELS[flare.category]}
          </SheetTitle>
          <SheetDescription className="text-left flex items-center gap-1">
            <ClockIcon size={16} />
            Expires in:
            <FlareCountdown createdAt={flare.createdAt} />
          </SheetDescription>
        </SheetHeader>
        <FlareSheetBody flareId={flare.id} />
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary">CLOSE</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export { FlareSheet };
