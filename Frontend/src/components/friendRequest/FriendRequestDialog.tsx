import { useFriendStore } from "@/stores/useFriendStore";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SentRequest from "./SentRequest";
import ReceivedRequest from "./ReceivedRequest";
import { Users } from "lucide-react";

interface FriendRequestDialogProps {
  open: boolean;
  setOpent: Dispatch<SetStateAction<boolean>>;
}

const FriendRequestDialog = ({ open, setOpen }: FriendRequestDialogProps) => {
  const [tab, setTab] = useState("received");
  const { getAllFriendRequest } = useFriendStore();

  useEffect(() => {
    const getAllRequest = async () => {
      try {
        await getAllFriendRequest();
      } catch (error) {
        console.error("Lỗi xảy ra khi getAllRequest", error);
      }
    };

    getAllRequest();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <div className="flex gap-2 items-center">
            <DialogTitle>Lời mời kết bạn</DialogTitle>
            <Users className="size-5" />
          </div>
        </DialogHeader>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="received">Đã nhận</TabsTrigger>
            <TabsTrigger value="sent">Đã gửi</TabsTrigger>
          </TabsList>

          <TabsContent value="received">
            <ReceivedRequest />
          </TabsContent>
          <TabsContent value="sent">
            <SentRequest />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default FriendRequestDialog;
