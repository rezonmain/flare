import type { Flare } from "@/db/schema";
import {
  SheetClose,
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

type FlareSheetProps = {
  flare: Flare;
};

const FlareSheet: React.FC<FlareSheetProps> = ({ flare }) => {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col gap-6">
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
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <Button variant="secondary">CLOSE</Button>
        </SheetClose>
      </SheetFooter>
    </div>
  );
};

export { FlareSheet };
