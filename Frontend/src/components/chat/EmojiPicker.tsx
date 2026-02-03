import { useThemeStore } from "@/stores/useThemeStore";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Smile } from "lucide-react";
import EmojiPickerReact, {type EmojiClickData, Theme } from "emoji-picker-react";

interface EmojiPickerProps {
  onChange: (value: string) => void;
}

const EmojiPicker = ({ onChange }: EmojiPickerProps) => {
  const { isDark } = useThemeStore();

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <Smile className="size-4" />
      </PopoverTrigger>

      <PopoverContent
        className="bg-transparent border-none shadow-none drop-shadow-none mb-12 p-0"
        side="right"
        sideOffset={40}
      >
        <EmojiPickerReact
          theme={isDark ? Theme.DARK : Theme.LIGHT}
          onEmojiClick={(emojiData: EmojiClickData) => {
            onChange(emojiData.emoji);
          }}
          height={350}
          width={300}
          searchDisabled={false}
          previewConfig={{ showPreview: false }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
