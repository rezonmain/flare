import { useMemo } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
} from "@/components/bottom-navigation/bottom-navigation";
import { NewPostDrawer } from "@/components/new-post-drawer/new-post-drawer";
import { useDrawer } from "@/state";

const FlareMapBottom = () => {
  const { openDrawer } = useDrawer();

  const actions: BottomNavigationAction[] = useMemo(
    () => [
      {
        label: "Profile",
        icon: "user",
        onClick: () => console.log("Profile"),
      },
      {
        label: "Near me",
        icon: "map-pin",
        onClick: () => console.log("Near me"),
      },
      {
        label: "Trending",
        icon: "sparkles",
        onClick: () => console.log("Trending"),
      },
      {
        label: "Post",
        icon: "pen-line",
        onClick: () =>
          openDrawer({
            name: "new-post",
            component: <NewPostDrawer />,
          }),
      },
    ],
    [openDrawer]
  );

  return (
    <div className="fixed bottom-0 w-full flex flex-col gap-4">
      <BottomNavigation actions={actions} />
    </div>
  );
};

export { FlareMapBottom };
