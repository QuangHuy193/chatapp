import { Badge } from "@/components/ui/badge";

const UnreadCountBadge = ({ unreadCount }: { unreadCount: number }) => {
  return (
    <div className="pulse-ring absolute z-20 -top-1 -right-1">
      <Badge
        className="size-5 text-xs bg-gradient-chat border flex 
      items-center justify-center p-0 border-background"
      >
        {unreadCount > 9 ? "9+" : unreadCount}
      </Badge>
    </div>
  );
};

export default UnreadCountBadge;
