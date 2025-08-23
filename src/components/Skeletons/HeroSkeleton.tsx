import { Skeleton } from "../ui/skeleton";

export default function HeroSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-6 py-12">
  
      <div className="space-y-4">
        <Skeleton className="h-10 w-3/4 rounded-md" /> {/* Heading */}
        <Skeleton className="h-6 w-full rounded-md" /> {/* Subheading */}
        <Skeleton className="h-6 w-5/6 rounded-md" />
        <div className="flex space-x-4 pt-4">
          <Skeleton className="h-10 w-28 rounded-md" /> {/* Button 1 */}
          <Skeleton className="h-10 w-28 rounded-md" /> {/* Button 2 */}
        </div>
      </div>

     
      <div className="flex justify-center">
        <Skeleton className="h-64 w-full md:w-3/4 rounded-xl" />
      </div>
    </div>
  )
}
