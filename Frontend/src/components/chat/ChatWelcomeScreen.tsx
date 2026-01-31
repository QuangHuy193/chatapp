import { APP_NAME } from "@/lib/constant";
import { SidebarInset } from "../ui/sidebar";
import ChatWindowHeader from "./ChatWindowHeader";

const ChatWelcomeScreen = () => {
  return (
    <SidebarInset className="flex h-full w-full bg-transparent">
      <ChatWindowHeader />

      <div className="flex bg-primary-foreground rounded-2xl flex-1 items-center justify-center">
        <div className="text-center">
          <div
            className="size-24 mx-auto mb-6 bg-gradient-chat rounded-full items-center justify-center
          shadow-glow pulse-ring flex"
          >
            <span>
              <img
                src="/chat.png"
                alt="Chat"
                className="w-10 h-10 brightness-0 invert"
              />
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-2 bg-gradient-chat bg-clip-text text-transparent">
            Chào mừng bạn đến với {APP_NAME}
          </h2>

          <p className="text-muted-foreground">
            Chọn 1 cuộc hội thoại để bắt đầu trò chuyện!
          </p>
        </div>
      </div>
    </SidebarInset>
  );
};

export default ChatWelcomeScreen;
