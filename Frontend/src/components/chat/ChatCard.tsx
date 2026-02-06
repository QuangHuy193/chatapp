import { formatOnlineTime, cn } from "@/lib/utils";
import type React from "react";
import { Card } from "../ui/card";
import RankLabel from "../profile/RankLabel";

interface ChatCardProps {
  convoId: string;
  name: string;
  rankLabel?: string;
  rankCss?: string;
  timmestamp?: Date;
  isActive: boolean;
  onSelect: (id: string) => void;
  unreadCount?: number;
  leftSection: React.ReactNode; //avatar
  subtitle: React.ReactNode; //mô tả bên phải
  menu: React.ReactNode; // menu cho covo
}

const ChatCard = ({
  convoId,
  name,
  rankLabel,
  rankCss,
  timmestamp,
  isActive,
  onSelect,
  unreadCount,
  leftSection,
  subtitle,
  menu,
}: ChatCardProps) => {
  return (
    <Card
      key={convoId}
      className={cn(
        `border-none p-3 cursor-pointer transition-smooth glass hover:bg-muted/30`,
        isActive &&
          `ring-2 ring-primary/50 bg-linear-to-tr from-primary-glow/10 to-primary-foreground`,
      )}
      onClick={() => onSelect(convoId)}
    >
      <div className="flex items-center gap-3">
        <div className="relative">{leftSection}</div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className=" flex gap-11">
              <h3
                className={cn(
                  `font-semibold text-sm truncate`,
                  unreadCount && unreadCount > 0 && "text-foreground",
                )}
              >
                {name}
              </h3>
              {rankLabel && rankCss && (
                <RankLabel label={rankLabel} rankCss={rankCss} />
              )}
            </div>
            <span className="text-sm text-foreground">
              {timmestamp ? formatOnlineTime(timmestamp) : ""}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 flex-1 min-w-0">
              {subtitle}
            </div>

            <div
              className="opacity-0 size-4
            group-hover:opacity-100 hover:scale-120 transition-smooth"
            >
              {menu}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChatCard;
