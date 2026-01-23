import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";

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

  return <button onClick={hanldeLogout}>logout</button>;
};

export default Logout;
