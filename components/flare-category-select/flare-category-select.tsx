import { FlareCategory } from "@/constants/flare.enums";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "../ui/badge";
import {
  FLARE_CATEGORY_DESCRIPTIONS,
  FLARE_CATEGORY_ICONS,
  FLARE_CATEGORY_LABELS,
} from "@/constants/flare.constants";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { RadioButtonIcon } from "../ui/radio-button-icon";
import { Separator } from "@/components/ui/separator";

type FlareCategorySelectProps = {
  value: FlareCategory;
  onChange: (category: FlareCategory) => void;
};

const FlareCategorySelect: React.FC<FlareCategorySelectProps> = ({
  value,
  onChange,
}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Badge className="flex gap-4 items-center">
          <p>Category: {FLARE_CATEGORY_LABELS[value]}</p>
          <ChevronDown size="18px" />
        </Badge>
      </SheetTrigger>
      <SheetContent className="w-full">
        <SheetHeader>
          <SheetTitle className="text-left">Flare category</SheetTitle>
          <SheetDescription className="text-left">
            You can select different categories for your flare. <br />
            <br />
            This categories will show as different icons on the map. Also the
            way people interact with your flare will be different based on the
            category. Current category is:{" "}
            <strong>{FLARE_CATEGORY_LABELS[value]}</strong>
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-5">
          <RadioGroup className="pt-10" defaultValue={value}>
            <p className="pb-3 font-bold">Choose a category</p>
            <div className="flex flex-col gap-6">
              {Object.entries(FlareCategory).map(
                ([categoryKey, categoryValue]) => (
                  <>
                    <RadioButtonIcon
                      key={categoryKey}
                      id={categoryKey}
                      value={categoryValue}
                      checked={value === categoryValue}
                      onClick={() => onChange(categoryValue)}
                      icon={FLARE_CATEGORY_ICONS[categoryValue]}
                      label={FLARE_CATEGORY_LABELS[categoryValue]}
                      description={FLARE_CATEGORY_DESCRIPTIONS[categoryValue]}
                    />
                    <Separator />
                  </>
                )
              )}
            </div>
          </RadioGroup>
          <SheetFooter>
            <SheetClose asChild>
              <Button>DONE</Button>
            </SheetClose>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { FlareCategorySelect };
