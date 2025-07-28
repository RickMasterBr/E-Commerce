'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      const res = await fetch('/api/user/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews);
      }
      setLoading(false);
    };
    fetchReviews();
  }, []);

  if (loading) {
      return <p>A carregar as suas avaliações...</p>
  }

  return (
      <div>
        <h1 className="text-[#1b0e0f] text-2xl font-bold mb-6">Minhas Avaliações</h1>
        <div className="space-y-6">
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review._id} className="flex gap-4 p-4 rounded-lg border border-gray-200">
                        <Link href={`/shop/${review.productId}`}>
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                                <Image 
                                    src={review.productImage || '/placeholder.jpg'} 
                                    alt={review.productName}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                        </Link>
                        <div className="flex-grow">
                            <Link href={`/shop/${review.productId}`}>
                                <h3 className="font-bold text-lg hover:underline">{review.productName}</h3>
                            </Link>
                            <div className="flex items-center my-1">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`text-xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                                ))}
                            </div>
                            <p className="text-sm text-gray-600 italic">"{review.comment}"</p>
                            <p className="text-xs text-gray-400 mt-2">
                                Avaliado em {new Date(review.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-center py-10 px-6 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Ainda não fez nenhuma avaliação.</p>
                    <Link href="/shop" className="text-blue-600 hover:underline mt-2 inline-block">
                        Veja os nossos produtos e partilhe a sua opinião!
                    </Link>
                </div>
            )}
        </div>
      </div>
  );
}