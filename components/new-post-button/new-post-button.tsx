import { PenLineIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type NewPostButtonProps = {
  onClick: () => void;
};

const NewPostButton: React.FC<NewPostButtonProps> = ({ onClick }) => {
  return (
    <div>
      <Button onClick={onClick} size="icon" className="w-14 h-14">
        <PenLineIcon />
      </Button>
    </div>
  );
};

export { NewPostButton };
