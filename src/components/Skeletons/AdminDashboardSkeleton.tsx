import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardSkeleton() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Skeleton className="h-8 w-48" />

     
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      
        <Skeleton className="h-[420px] col-span-1 lg:col-span-4" />
        <Skeleton className="h-[420px] col-span-1 lg:col-span-3" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
     
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    </div>
  );
}