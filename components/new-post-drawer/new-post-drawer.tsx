import { useRouter } from "next/navigation";
import { useGeolocation } from "@uidotdev/usehooks";
import { nil } from "@rezonmain/utils-nil";
import {
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { NewPostForm } from "@/components/new-post-form/new-post-form";
import { Skeleton } from "@/components/ui/skeleton";

type NewPostDrawerProps = {
  location?: {
    lat: number;
    lng: number;
  };
};

const NewPostDrawer: React.FC<NewPostDrawerProps> = ({ location }) => {
  const { latitude, longitude, loading } = useGeolocation();
  const router = useRouter();

  if (loading) {
    <>
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
    </>;
  }

  if (nil(latitude) || nil(longitude)) {
    return (
      <>
        <DrawerDescription className="text-center p-10">
          Flare encountered an error trying to get you location
        </DrawerDescription>
        <DrawerFooter>
          <Button onClick={router.refresh}>RELOAD</Button>
        </DrawerFooter>
      </>
    );
  }

  return (
    <>
      <DrawerHeader>
        <DrawerTitle className="text-left">Create a Flare</DrawerTitle>
        <DrawerDescription className="text-left">
          A new Flare will be placed on your current location
        </DrawerDescription>
      </DrawerHeader>
      <div className="px-4">
        <NewPostForm
          location={
            nil(location) ? { lat: latitude, lng: longitude } : location
          }
        />
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="outline">CANCEL</Button>
        </DrawerClose>
      </DrawerFooter>
    </>
  );
};

export { NewPostDrawer };
