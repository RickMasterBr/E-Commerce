// Este componente não precisa de 'use client'
export default function ProductCardSkeleton() {
    return (
      <div className="flex flex-col gap-3 pb-3">
        {/* Placeholder para a imagem */}
        <div className="w-full aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
        
        {/* Placeholder para o texto */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
        </div>
      </div>
    );
  }