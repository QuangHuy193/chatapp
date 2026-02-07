import type { RankType } from "@/types/rank";
import RankLabel from "./RankLabel";
import type { User } from "@/types/user";

interface RankProgressBar {
  ranks: RankType[];
  user: User | null;
}

const RankProgressBar = ({ ranks, user }: RankProgressBar) => {
  return (
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
                    className="h-full bg-linear-to-r from-red-100 via-red-300 to-red-500 
                    transition-all"
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
  );
};

export default RankProgressBar;
