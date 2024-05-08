import { type Dispatch, type SetStateAction } from "react";
import { useRouter } from "next/navigation";
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
import { useGeolocation } from "@uidotdev/usehooks";
import { NewPostForm } from "../new-post-form/new-post-form";
import { nil } from "@rezonmain/utils-nil";
import { Skeleton } from "../ui/skeleton";

type NewPostDrawerProps = {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
};

const NewPostDrawer: React.FC<NewPostDrawerProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const { latitude, longitude, loading } = useGeolocation();
  const router = useRouter();

  if (loading) {
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create a Flare</DrawerTitle>
          <DrawerDescription>
            A new Flare will be placed on your current location
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">CANCEL</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>;
  }

  if (nil(latitude) || nil(longitude)) {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerDescription className="text-center p-10">
            Flare encountered an error trying to get you location
          </DrawerDescription>
          <DrawerFooter>
            <Button onClick={router.refresh}>RELOAD</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-left">Create a Flare</DrawerTitle>
          <DrawerDescription className="text-left">
            A new Flare will be placed on your current location
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <NewPostForm
            location={{ lat: latitude, lng: longitude }}
            onOpenChange={onOpenChange}
          />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">CANCEL</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export { NewPostDrawer };
