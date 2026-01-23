import Logout from "@/components/auth/logout";
import { useAuthStore } from "../stores/useAuthStore";

const ChatAppPage = () => {
  // chỉ rerender khi user thay đổi
  const user = useAuthStore((s) => s.user);
  return (
    <div>
      {user?.userName}
      <Logout />
    </div>
  );
};

export default ChatAppPage;
