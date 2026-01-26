import Logout from "@/components/auth/logout";
import { useAuthStore } from "../stores/useAuthStore";
import api from "@/lib/axios";
import { toast } from "sonner";

const ChatAppPage = () => {
  // chỉ rerender khi user thay đổi
  const user = useAuthStore((s) => s.user);

  const handleTest = async () => {
    try {
      await api.get(`users/test`, { withCredentials: true });
      toast.success("OK");
    } catch (error) {
      console.log(error);
      toast.error("lỗi");
    }
  };
  return (
    <div>
      {user?.userName}
      <Logout />

      <div onClick={handleTest}>test</div>
    </div>
  );
};

export default ChatAppPage;
