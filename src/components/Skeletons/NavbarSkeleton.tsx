import { Skeleton } from "@/components/ui/skeleton"

export default function NavbarSkeleton() {
  return (
    <div className="w-full flex items-center justify-between px-6 py-4 border-b">

      <Skeleton className="h-8 w-24 rounded-md" />


      <div className="hidden md:flex space-x-6">
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-16 rounded-md" />
        <Skeleton className="h-6 w-16 rounded-md" />
      </div>

      <Skeleton className="h-9 w-20 rounded-md" />
    </div>
  )
}
