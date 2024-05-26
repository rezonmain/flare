import { toast } from "sonner";
import { Camera, ImagePlusIcon, XIcon } from "lucide-react";
import { empty } from "@rezonmain/utils-empty";
import { nil } from "@rezonmain/utils-nil";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type ImagePickerProps = {
  value: Blob | undefined | null;
  onChange: (value: Blob | null) => void;
};

const ImagePicker: React.FC<ImagePickerProps> = ({ onChange, value }) => {
  const handleImagePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (empty(e.target.files)) {
      return;
    }

    if (e.target.files[0].size > 4194304) {
      toast.error("Image size should be less than 4MB");
      return;
    }
    onChange(e.target.files[0]);
  };

  if (nil(value)) {
    return (
      <div className="flex gap-4">
        <label className="p-1 items-center rounded-full text-xs font-semibold transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-pointer">
          <ImagePlusIcon size={28} className="text-foreground" />
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={handleImagePick}
          />
        </label>
        <label className="p-1 items-center rounded-full text-xs font-semibold transition-colors focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-pointer">
          <Camera size={28} className="text-muted-foreground" />
        </label>
      </div>
    );
  }

  return (
    <div className="relative w-fit mt-2">
      <Button
        variant="outline"
        size="icon"
        className="absolute -top-2 -right-2 rounded-full h-8 w-8"
        onClick={() => onChange(null)}
      >
        <XIcon size={20} />
      </Button>
      <Image
        width={300}
        height={800}
        className="rounded-md shadow-md"
        src={URL.createObjectURL(value)}
        alt="user selected image"
      />
    </div>
  );
};

export { ImagePicker };
