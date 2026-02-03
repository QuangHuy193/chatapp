import { useFriendStore } from "@/stores/useFriendStore";
import FriendRequestItem from "./FriendRequestItem";
import { Button } from "../ui/button";
import { toast } from "sonner";

const ReceivedRequest = () => {
  const { acceptRequest, receivedList, declineRequest, loading } =
    useFriendStore();

  if (!receivedList || receivedList.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Bạn chưa có lời mời kết bạn nào.
      </p>
    );
  }

  const handleAccept = async (requestId: string) => {
    try {
      await acceptRequest(requestId);
      toast.success("Đã chấp nhận lời mời kết bạn");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };

  const handleDecline = async (requestId: string) => {
    try {
      await declineRequest(requestId);
      toast.success("Đã từ chối lời mời kết bạn");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    }
  };
  return (
    <div className="space-y-3">
      <>
        {receivedList.map((req) => (
          <FriendRequestItem
            key={req._id}
            type="received"
            requestInfo={req}
            action={
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleAccept(req._id)}
                  disabled={loading}
                >
                  Chấp nhận
                </Button>
                <Button
                  size="sm"
                  variant="destructiveOutline"
                  onClick={() => handleDecline(req._id)}
                  disabled={loading}
                >
                  Từ chối
                </Button>
              </div>
            }
          />
        ))}
      </>
    </div>
  );
};

export default ReceivedRequest;
