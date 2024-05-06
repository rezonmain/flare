import { type Dispatch, type SetStateAction } from "react";
import {
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

type NewPostDrawerProps = {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const NewPostDrawer: React.FC<NewPostDrawerProps> = ({
  isOpen,
  onOpenChange,
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a Flare</DrawerTitle>
          <DrawerDescription>
            A new Flare will be placed on your current location
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>POST</Button>
          <DrawerClose>
            <Button variant="outline">CANCEL</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export { NewPostDrawer };
