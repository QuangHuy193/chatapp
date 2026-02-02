import { useAuthStore } from "@/stores/useAuthStore";
import type { Conversation } from "@/types/chat";
import { ImagePlus, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import EmojiPicker from "./EmojiPicker";
import { useChatStore } from "@/stores/useChatStore";
import { toast } from "sonner";

const MessageInput = ({ selectedConvo }: { selectedConvo: Conversation }) => {
  const { user } = useAuthStore();
  const { sendDirectMessage, sendGroupMessage } = useChatStore();
  const [messValue, setMessValue] = useState("");

  if (!user) return;

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!messValue.trim()) {
      return;
    }
    const currValue = messValue;
    setMessValue("");

    try {
      if (selectedConvo.type === "direct") {
        const participants = selectedConvo.participants;
        const otherUser = participants.filter((p) => p.userId !== user._id)[0];

        await sendDirectMessage(otherUser.userId, currValue, selectedConvo._id);
      } else {
        await sendGroupMessage(selectedConvo._id, currValue);
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi xảy ra khi gửi tin nhắn");
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 min-h-14 bg-background">
      <Button
        variant={"ghost"}
        size="icon"
        className="hover:bg-primary/10 transition-smooth"
      >
        <ImagePlus className="size-4 " />
      </Button>

      <div className="flex-1 relative">
        <Input
          onKeyPress={handleKeyPress}
          value={messValue}
          onChange={(e) => {
            setMessValue(e.target.value);
          }}
          placeholder="Soạn tin nhắn"
          className="pr-20 h-9 bg-white border-border/50 focus:border-primary/50
          transition-smooth resize-none"
        ></Input>
        <div
          className="absolute right-2 top-1/2 -translate-y-1/2 transform flex
          items-center gap-1"
        >
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="size-8 hover:bg-primary/10 transition-smooth"
          >
            <div>
              <EmojiPicker
                onChange={(emoji: string) => {
                  setMessValue(`${messValue}${emoji}`);
                }}
              />
            </div>
          </Button>
        </div>
      </div>

      <Button
        onClick={sendMessage}
        className="bg-gradient-chat hover:shadow-glow transition-smooth
        hover:scale-105 cursor-pointer"
        disabled={!messValue.trim()}
      >
        <Send className="size-4 text-white" />
      </Button>
    </div>
  );
};

export default MessageInput;
