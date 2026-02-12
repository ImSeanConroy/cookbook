import { Skeleton } from "@/components/ui/skeleton";

const RecipeSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-[300px] w-full rounded-t-lg" />

    <div className="space-y-3 px-4">
      <div className="flex flex-row">
        <div className="space-y-3">
          <Skeleton className="h-8 w-2/4" />
          <Skeleton className="h-5 w-1/3" />
        </div>

        <div className="flex gap-4 mt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-md" />
          ))}
        </div>
      </div>

      <Skeleton className="h-16 w-full mt-4" />

      <div className="grid grid-cols-3 gap-10 mt-6">
        <Skeleton className="h-64 col-span-1 rounded-lg" />
        <Skeleton className="h-64 col-span-2 rounded-lg" />
      </div>
    </div>
  </div>
);

export default RecipeSkeleton;
