import { useCallback, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { empty } from "@rezonmain/utils-empty";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TAG_FORMAT_REGEX } from "@/constants/tags.constants";

type FlareTagsFieldProps = {
  value: string[];
  onChange: (tags: string[]) => void;
};

const FlareTagsField: React.FC<FlareTagsFieldProps> = ({ value, onChange }) => {
  const [tagInput, setTagInput] = useState<string>("");
  const formattedTags = useMemo(
    () => value.map((tag) => `#${tag}`).join(" "),
    [value]
  );
  const handleAddTag = useCallback(() => {
    if (empty(tagInput)) return;
    const formattedInput = tagInput
      .trim()
      .replace(TAG_FORMAT_REGEX, "")
      .toLowerCase();
    onChange([...value, formattedInput]);
    setTagInput("");
  }, [onChange, tagInput, value]);

  const handleRemoveTag = useCallback(
    (tag: string) => {
      const newTags = value.filter((t) => t !== tag);
      onChange(newTags);
    },
    [onChange, value]
  );
  return (
    <Sheet>
      <SheetTrigger>
        <Badge className="flex gap-4 items-center">
          <p className="truncate max-w-20">Tags: {formattedTags}</p>
          <ChevronDown size="24px" />
        </Badge>
      </SheetTrigger>
      <SheetContent className="w-full h-svh flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex flex-col gap-5">
            <SheetHeader>
              <SheetTitle className="text-left">Flare tags</SheetTitle>
              <SheetDescription className="text-left">
                You can add multiple tags to your Flare <br />
                <br />
                Tags help people find your Flare. Use tags that describe your
                Flare. Use tags that are topical to your Flare.
              </SheetDescription>
            </SheetHeader>
            <Input
              id="new-tag"
              placeholder="New tag"
              value={tagInput}
              pattern="^[a-zA-Z0-9_]*$"
              onChange={(e) => setTagInput(e.target.value)}
            />
            <Button onClick={handleAddTag} disabled={empty(tagInput)}>
              ADD TAG
            </Button>
          </div>

          <div className="mt-10 flex flex-col gap-3">
            <p className="font-bold">Current tags</p>
            {empty(value) && <p>You have not added any tags</p>}
            <div className="flex gap-2 flex-wrap">
              {value.map((tag) => (
                <Button
                  variant="ghost"
                  key={tag}
                  className="p-0"
                  onClick={() => handleRemoveTag(tag)}
                >
                  <Badge variant="outline" className="p-3 max-w-[85vw]">
                    <p className="font-bold truncate">#{tag}</p>
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>DONE</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export { FlareTagsField };
