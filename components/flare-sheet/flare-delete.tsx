import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { MapCapabilities } from "@/constants/map.enum";
import { useSheet, useUser } from "@/state";
import { deleteFlare } from "@/client-api/queries";

type FlareDeleteProps = {
  flareId: string;
};

const FlareDelete: React.FC<FlareDeleteProps> = ({ flareId }) => {
  const { capabilities } = useUser();
  const { closeSheet } = useSheet();
  const { isPending, mutateAsync } = useMutation({
    mutationKey: [flareId],
    mutationFn: deleteFlare,
  });

  if (!capabilities.includes(MapCapabilities.FLARE_DELETE)) {
    return null;
  }

  const handleDelete = async () => {
    await mutateAsync(flareId);
    toast.success("Flare deleted");
    closeSheet();
  };

  return (
    <Button onClick={handleDelete} disabled={isPending} variant="destructive">
      ADMIN: Delete
    </Button>
  );
};

export { FlareDelete };
