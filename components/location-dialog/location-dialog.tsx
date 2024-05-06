"use client";
import { useGeolocation, useMediaQuery } from "@uidotdev/usehooks";
import { nil } from "@rezonmain/utils-nil";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const TITLE_COPY = "Flare shows what is happening around you";
const BODY_COPY =
  "Please allow Flare to access your location. Flare asks permission for your location so it can show relevant events around you.";
const BUTTON_COPY = "ALLOW LOCATION";

const LocationDialog: React.FC = () => {
  const router = useRouter();
  const { loading, latitude, longitude, error } = useGeolocation();
  const shouldShowDialog = loading || nil(latitude) || nil(longitude);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={shouldShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{TITLE_COPY}</DialogTitle>
            <DialogDescription>{BODY_COPY}</DialogDescription>
          </DialogHeader>
          {error && (
            <DialogFooter>
              <Button onClick={router.refresh}>{BUTTON_COPY}</Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={shouldShowDialog}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{TITLE_COPY}</DrawerTitle>
          <DrawerDescription>{BODY_COPY}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          {error && (
            <DialogFooter>
              <Button onClick={router.refresh}>{BUTTON_COPY}</Button>
            </DialogFooter>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export { LocationDialog };
