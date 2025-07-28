// Este componente não precisa de 'use client'
export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
      {/* Image skeleton */}
      <div className="relative aspect-square bg-gray-200">
        <div className="absolute inset-0 loading-shimmer" />
      </div>
      
      {/* Content skeleton */}
      <div className="p-3 space-y-2">
        {/* Title skeleton */}
        <div className="space-y-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 loading-shimmer" />
          <div className="h-4 bg-gray-200 rounded w-1/2 loading-shimmer" />
        </div>
        
        {/* Price skeleton */}
        <div className="h-6 bg-gray-200 rounded w-1/3 loading-shimmer" />
        
        {/* Stock skeleton */}
        <div className="h-3 bg-gray-200 rounded w-1/4 loading-shimmer" />
      </div>
    </div>
  );
}