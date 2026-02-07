import type { User } from "@/types/user";
import { Card, CardContent } from "../ui/card";
import UserAvatar from "../chat/UserAvatar";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { useSocketStore } from "@/stores/useSocketStore";
import UploadAvatar from "./UploadAvatar";
import RankLabel from "../rankLabel/RankLabel";
import EditRankTypeDialog from "../rankLabel/EditRankTypeDialog";

interface ProfileCardProps {
  user: User | null;
}
const ProfileCard = ({ user }: ProfileCardProps) => {
  const { onlineUsers } = useSocketStore();

  if (!user) return;

  const isOnline = onlineUsers.includes(user._id) ? true : false;
  return (
    <Card
      className="overflow-hidden max-h-80 bg-linear-to-r from-indigo-500 
    via-purple-500 to-pink-500"
    >
      <CardContent
        className="mt-12 flex flex-col sm:flex-row items-center sm:items-end gap-3
      md:gap-6"
      >
        <div className="relative">
          <UserAvatar
            type="profile"
            name={user.displayName}
            avatarUrl={user.avatarUrl ?? undefined}
            className="ring-4 ring-white shadow-lg"
          />
          {/* upload avt */}
          <UploadAvatar />
        </div>

        {/* userinfo */}
        <div className="text-center sm:text-left flex-1">
          <div
            className="flex justify-center md:justify-start md:gap-7 items-center
           md:items-end relative"
          >
            <RankLabel
              label={user.rank?.level.label ?? ""}
              rankCss={user.rank?.level.uiCss ?? ""}
            />
            <div
              className="absolute md:relative -bottom-4 right-3 md:bottom-auto 
            md:right-auto"
            >
              <EditRankTypeDialog />
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {user.displayName}
          </h1>

          <p className="text-white/70 text-sm mt-2 max-w-lg line-clamp-2">
            {user.bio || "Bạn chưa viết gì cả."}
          </p>
        </div>

        {/* status */}
        <Badge
          className={cn(
            "flex items-center gap-1 capitalize",
            isOnline
              ? "bg-green-100 text-green-700"
              : "bg-slate-100 text-slate-700",
          )}
        >
          <div
            className={cn(
              `size-2 rounded-full`,
              isOnline ? "bg-green-500 animate-pulse" : "bg-slate-500",
            )}
          ></div>
          {isOnline ? "Hoạt động" : "Không hoạt động"}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
