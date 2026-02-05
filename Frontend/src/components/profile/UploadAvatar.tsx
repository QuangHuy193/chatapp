import { useUserStore } from "@/stores/useUserStore";
import { useRef } from "react";
import { Button } from "../ui/button";
import { Camera } from "lucide-react";

const UploadAvatar = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updatedAvatarUrl } = useUserStore();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    await updatedAvatarUrl(formData);
  };

  return (
    <>
      <Button
        className="absolute -bottom-2 -right-2 size-9 rounded-full shadow-md 
        hover:scale-115 transition duration-300 hover:bg-background"
        size="icon"
        variant="secondary"
        onClick={handleClick}
      >
        <Camera className="size-5"/>
      </Button>

      <input type="file" hidden ref={fileInputRef} onChange={handleUpload} />
    </>
  );
};

export default UploadAvatar;
