const ChatWindowSkeleton = () => {
  return (
    <div className="flex justify-center flex-col gap-1 w-full animate-pulse ">
      <div className="flex gap-2">
        <div className="size-10 rounded-full bg-slate-300 dark:bg-slate-500"></div>
        <div className="flex gap-1 flex-col">
          <div className="w-40 h-12 bg-slate-300 dark:bg-slate-500 rounded-md"></div>
          <div className="w-80 h-12 bg-slate-300 dark:bg-slate-500 rounded-md"></div>
        </div>
      </div>

      <div className="flex flex-col gap-1 items-end">
        <div className="w-40 h-12 bg-slate-300 dark:bg-slate-500 rounded-md"></div>
        <div className="w-80 h-12 bg-slate-300 dark:bg-slate-500 rounded-md"></div>
      </div>
    </div>
  );
};

export default ChatWindowSkeleton;
