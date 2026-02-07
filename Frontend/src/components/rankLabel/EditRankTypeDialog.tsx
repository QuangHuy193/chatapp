import { Edit, Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useEffect, useState } from "react";
import { rankTypeSevice } from "@/services/rankTypeSevice";
import type { RankType } from "@/types/rank";
import RankTypeCard from "./RankTypeCard";
import { Button } from "../ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import RankProgressBar from "./RankProgressBar";
import { useUserStore } from "@/stores/useUserStore";

const EditRankTypeDialog = () => {
  const { user } = useAuthStore();
  const { loadingUpdate } = useUserStore();
  const [ranks, setRanks] = useState<RankType[] | []>([]);
  const [selectedRankTypeId, setSelectedRankTypeId] = useState(
    user?.rank?.type._id ?? "mac-dinh",
  );

  const handleUpdateRankType = async (rankTypeId: string) => {
    try {
      await useUserStore.getState().updateRankType(rankTypeId);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getRankType = async () => {
      try {
        const res = await rankTypeSevice.getAllRanktype();

        setRanks(res);
      } catch (error) {
        console.error(error);
      }
    };

    getRankType();
  }, []);

  return (
    <Dialog>
      <DialogTrigger>
        <Edit className="size-4 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b pb-1">
          <DialogTitle>Cấp bậc hiển thị</DialogTitle>
          <DialogDescription
            className="flex gap-2 items-center justify-center 
          md:justify-start"
          >
            <Heart className="size-4 " /> Tùy chỉnh danh hiệu theo sở thích
          </DialogDescription>
        </DialogHeader>

        {/* cấp hiện tại, Progress */}
        <RankProgressBar ranks={ranks} user={user} />

        {/* chọn loại rank */}
        <div className="space-y-2  overflow-y-auto max-h-80">
          {ranks.length > 0 &&
            ranks.map((r) => (
              <RankTypeCard
                key={r._id}
                rankType={r}
                selectedRankTypeId={selectedRankTypeId}
                onSelect={setSelectedRankTypeId}
              />
            ))}
        </div>
        {user?.rank?.type._id &&
          user?.rank?.type._id !== selectedRankTypeId && (
            <div className="flex justify-end">
              <Button
                disabled={loadingUpdate}
                type="button"
                onClick={() => handleUpdateRankType(selectedRankTypeId)}
              >
                Lưu thay đổi
              </Button>
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
};

export default EditRankTypeDialog;
