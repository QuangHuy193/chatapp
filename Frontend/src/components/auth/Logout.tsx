import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";

const Logout = () => {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();
  const hanldeLogout = async () => {
    try {
      const isSuccess = await signOut();
      if (isSuccess) {
        navigate("/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      className="p-0 cursor-pointer"
      onClick={hanldeLogout}
      variant="completeGhost"
    >
      Đăng xuất
    </Button>
  );
};

export default Logout;
