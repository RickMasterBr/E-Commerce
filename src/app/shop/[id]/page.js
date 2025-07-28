'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useSession } from 'next-auth/react'; // Importar useSession
import toast from 'react-hot-toast'; // Importar toast

// --- COMPONENTE DO FORMULÁRIO DE AVALIAÇÃO (pode ser movido para um arquivo separado depois) ---
function ReviewForm({ productId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
        const res = await fetch(`/api/products/${productId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rating, comment }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Falha ao enviar avaliação.');
        }

        const newReview = await res.json();
        toast.success('Avaliação enviada com sucesso!');
        onReviewAdded(newReview.review); // Atualiza a lista de reviews na página pai
        setComment(''); // Limpa o formulário
        setRating(5);

    } catch (error) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-bold mb-4">Deixe a sua avaliação</h3>
      <div className="mb-4">
        <label className="block font-medium mb-1">Nota</label>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="comment" className="block font-medium mb-1">Comentário</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      <button type="submit" disabled={loading} className="px-5 py-2 bg-[#e82630] text-white font-bold rounded-full disabled:bg-red-300">
        {loading ? 'A enviar...' : 'Enviar Avaliação'}
      </button>
    </form>
  );
}


// --- COMPONENTE DA PÁGINA PRINCIPAL ---
export default function ProductPage({ params }) {
    const { id } = params;
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const { addToCart } = useCart();
    const { data: session, status } = useSession(); // Obter dados da sessão

    // Função para buscar os dados
    const fetchData = async () => {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      
      const productRes = await fetch(`${apiUrl}/api/produtos/${id}`, { cache: 'no-store' });
      if (!productRes.ok) {
        notFound();
        return;
      }
      const productData = await productRes.json();
      
      const relatedRes = await fetch(`${apiUrl}/api/produtos`, { cache: 'no-store' });
      const allProducts = await relatedRes.json();
      const relatedData = allProducts
        .filter(p => p.categoria === productData.categoria && p._id !== productData._id)
        .slice(0, 3);

      setProduct(productData);
      setRelatedProducts(relatedData);
      setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleReviewAdded = (newReview) => {
      setProduct(prevProduct => ({
        ...prevProduct,
        reviews: [newReview, ...(prevProduct.reviews || [])]
      }));
    };

    if (loading || !product) {
        return <p className="text-center py-20">Carregando produto...</p>;
    }

    const reviews = product.reviews || [];

    return (
        <div className="bg-[#fcf8f8] px-4 sm:px-10 lg:px-40 py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1 mx-auto">
                
                {/* ... (Breadcrumbs, Imagem, Detalhes, etc. - todo o seu JSX existente) ... */}
                <div className="flex px-4 py-3">
                    <button 
                        onClick={() => addToCart(product)}
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 flex-1 bg-[#e82630] text-[#fcf8f8] text-base font-bold leading-normal tracking-[0.015em] hover:bg-red-700 transition-colors">
                        <span className="truncate">Add to Cart</span>
                    </button>
                </div>

                {/* --- SEÇÃO DE AVALIAÇÕES --- */}
                <div className="px-4 py-8 mt-8 border-t">
                    <h2 className="text-2xl font-bold mb-6">Avaliações de Clientes ({reviews.length})</h2>
                    <div className="space-y-6">
                        {reviews.length > 0 ? (
                            reviews.map(review => (
                                <div key={review._id} className="border-b pb-4">
                                    <div className="flex items-center mb-2">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className={`text-xl ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                                            ))}
                                        </div>
                                        <p className="ml-4 font-bold">{review.userName}</p>
                                    </div>
                                    <p className="text-gray-600">{review.comment}</p>
                                    <p className="text-xs text-gray-400 mt-2">{new Date(review.createdAt).toLocaleDateString()}</p>
                                </div>
                            ))
                        ) : (
                            <p>Este produto ainda não tem avaliações. Seja o primeiro a avaliar!</p>
                        )}
                    </div>
                    {/* Mostra o formulário apenas se o usuário estiver logado */}
                    {status === 'authenticated' && (
                      <ReviewForm productId={product._id} onReviewAdded={handleReviewAdded} />
                    )}
                    {status === 'unauthenticated' && (
                      <p className="mt-8 text-center bg-gray-100 p-4 rounded-lg">
                        <Link href="/login" className="text-blue-600 font-semibold hover:underline">Faça login</Link> para deixar uma avaliação.
                      </p>
                    )}
                </div>


                {/* Produtos Relacionados */}
                <h2 className="text-[#1b0e0f] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                  Related Products
                </h2>
                <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="flex items-stretch p-4 gap-4">
                    {relatedProducts.map(related => (
                      <Link href={`/shop/${related._id}`} key={related._id} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40 group">
                        <div className="relative w-full aspect-[3/4] bg-cover rounded-xl flex flex-col overflow-hidden">
                            <Image 
                                src={related.imagem || '/placeholder.jpg'}
                                alt={related.nome}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div>
                          <p className="text-[#1b0e0f] text-base font-medium leading-normal">{related.nome}</p>
                          <p className="text-[#974e52] text-sm font-normal leading-normal">{related.categoria}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
            </div>
        </div>
    );
}