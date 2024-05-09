import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Flare } from "@/db/schema";
import { MessagesSquare, Share2, ThumbsUp } from "lucide-react";

type FlareSheetActionsProps = {
  flareId: Flare["id"];
};

const ICON_SIZE = 22;

const FlareSheetActions: React.FC<FlareSheetActionsProps> = ({ flareId }) => {
  return (
    <div className="flex gap-2">
      <Badge className="h-9">
        <Button size="icon" className="flex gap-2 h-6">
          <ThumbsUp size={ICON_SIZE} />
          <code>0</code>
        </Button>
      </Badge>
      <Badge className="h-9">
        <Button size="icon" className="flex gap-2 h-6">
          <MessagesSquare size={ICON_SIZE} />
          <code>0</code>
        </Button>
      </Badge>
      <Badge className="h-9">
        <Button size="icon" className="h-6 w-5">
          <Share2 size={ICON_SIZE} />
        </Button>
      </Badge>
    </div>
  );
};

export { FlareSheetActions };
