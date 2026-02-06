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
import RankLabel from "./RankLabel";

const EditRankTypeDialog = () => {
  const { user } = useAuthStore();
  const [ranks, setRanks] = useState<RankType[] | []>([]);
  const [selectedRankTypeId, setSelectedRankTypeId] = useState(
    user?.rank?.type._id ?? "mac-dinh",
  );

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
          <DialogDescription className="flex gap-2 items-center justify-center md:justify-start">
            <Heart className="size-4 " /> Tùy chỉnh danh hiệu theo sở thích
          </DialogDescription>
        </DialogHeader>
        {/* cấp hiện tại, processBar */}
        <div>
          <div>
            <span>Cấp hiện tại: {user?.rank?.level.level} - </span>
            <span className="ml-7">
              <RankLabel
                label={user?.rank?.level.label ?? ""}
                rankCss={user?.rank?.level.uiCss ?? ""}
              />
            </span>
          </div>
          <div className="pt-3 pb-1">
            {ranks.length > 0 &&
              ranks.map((r) => {
                if (r._id !== user?.rank?.type._id) return null;

                const levelIndex = user.rank?.level.level - 1;

                const currentLevel = r.levels[levelIndex];
                const nextLevel = r.levels[levelIndex + 1];

                if (!currentLevel || !nextLevel) return null;

                const apCurrent = currentLevel.minAP;
                const apFuture = nextLevel.minAP;
                const userAP = user.activePoint ?? 0;

                const progress = Math.min(
                  100,
                  Math.max(
                    0,
                    ((userAP - apCurrent) / (apFuture - apCurrent)) * 100,
                  ),
                );

                return (
                  <div
                    key={r._id}
                    className="flex items-center gap-7 w-full max-w-md"
                  >
                    {/* Level hiện tại */}
                    <span className="text-sm font-medium">
                      <RankLabel
                        label={currentLevel.label ?? ""}
                        rankCss={currentLevel.uiCss ?? ""}
                      />
                    </span>

                    {/* Progress bar */}
                    <div className="flex-1 h-2 bg-gray-200 rounded-full relative">
                      {/* Thanh progress */}
                      <div
                        className="h-full bg-linear-to-r from-blue-400 to-blue-600 transition-all"
                        style={{ width: `${progress}%` }}
                      />

                      {/* Text % */}
                      <span
                        className="absolute -top-5 text-xs font-medium text-blue-600"
                        style={{
                          left: `${progress}%`,
                          transform: "translateX(-50%)",
                        }}
                      >
                        {Math.round(progress)}%
                      </span>
                    </div>

                    {/* Level kế tiếp */}
                    <span className="text-sm font-medium">
                      <RankLabel
                        label={nextLevel.label ?? ""}
                        rankCss={nextLevel.uiCss ?? ""}
                      />
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
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
              <Button>Lưu thay đổi</Button>
            </div>
          )}
      </DialogContent>
    </Dialog>
  );
};

export default EditRankTypeDialog;
