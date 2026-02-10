import { useEffect, type Dispatch, type SetStateAction } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useNotificationStore } from "@/stores/useNotificationStore";
import NotificationCard from "./NotificationCard";
import NotificationDialogSkeletonLoading from "../skeleton/NotificationDialogSkeletonLoading";

interface NotificationDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NotificationDialog = ({ open, setOpen }: NotificationDialogProps) => {
  const { fetchNotification, loading, notifications } = useNotificationStore();

  useEffect(() => {
    const fetchNoti = async () => {
      await fetchNotification();
    };

    fetchNoti();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Danh sách thông báo</DialogTitle>
        </DialogHeader>
        {loading ? (
          <NotificationDialogSkeletonLoading/>
        ) : (
          <div className="overflow-y-auto max-h-100 beautiful-scrollbar">
            <div className="rounded-lg border border-slate-300 overflow-hidden">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <NotificationCard noti={n} key={n._id} />
                ))
              ) : (
                <div className="text-muted-foreground flex items-center justify-center p-5">
                  Bạn chưa có thông báo nào!
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NotificationDialog;
