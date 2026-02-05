import { Card } from "../ui/card";

const ConversationSkeletonLoading = () => {
  return (
    <div className="space-y-1">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card key={index} className="p-3 border-none glass animate-pulse">
          <div className="flex gap-3 items-center">
            <div className="size-10 rounded-full  bg-muted"></div>

            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/2 bg-muted rounded" />
              <div className="h-3 w-3/4 bg-muted rounded" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ConversationSkeletonLoading;
