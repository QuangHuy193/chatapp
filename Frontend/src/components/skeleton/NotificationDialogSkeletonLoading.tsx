

const NotificationDialogSkeletonLoading = () => {
  return (
    <div className="flex flex-col divide-y">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 animate-pulse"
        >
          {/* Avatar */}
          <div className="relative">
            <div className="rounded-full size-10 bg-slate-200" />
            <div className="absolute -right-1.5 -bottom-1.5">
              <div className="size-3 rounded-full bg-slate-300" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/4 rounded bg-slate-200" />
            <div className="h-2 w-1/3 rounded bg-slate-200" />
          </div>

          {/* Time */}
          <div className="h-2 w-8 rounded bg-slate-200" />
        </div>
      ))}
    </div>
  );
};


export default NotificationDialogSkeletonLoading