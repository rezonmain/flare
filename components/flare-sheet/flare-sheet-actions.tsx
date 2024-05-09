import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Flare } from "@/db/schema";
import { MessagesSquare, Share2, ThumbsUp } from "lucide-react";

type FlareSheetActionsProps = {
  flareId: Flare["id"];
};

const FlareSheetActions: React.FC<FlareSheetActionsProps> = ({ flareId }) => {
  return (
    <div className="flex gap-3">
      <Badge>
        <Button size="icon" className="flex gap-2 h-6">
          <ThumbsUp size={18} />
          <code>0</code>
        </Button>
      </Badge>
      <Badge>
        <Button size="icon" className="flex gap-2 h-6">
          <MessagesSquare size={18} />
          <code>0</code>
        </Button>
      </Badge>
      <Badge>
        <Button size="icon" className="h-6 w-5">
          <Share2 size={18} />
        </Button>
      </Badge>
    </div>
  );
};

export { FlareSheetActions };
