import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// --- FUNÇÃO POST: Para adicionar uma nova avaliação a um produto ---
export async function POST(request, { params }) {
  const { id: productId } = params;
  const session = await getServerSession(authOptions);

  // 1. Proteger a rota: Apenas usuários logados podem avaliar
  if (!session) {
    return NextResponse.json({ message: 'Não autorizado. Faça login para avaliar.' }, { status: 401 });
  }

  try {
    const { rating, comment } = await request.json();

    // 2. Validar os dados recebidos
    if (!rating || !comment || rating < 1 || rating > 5) {
      return NextResponse.json({ message: 'Avaliação e comentário são obrigatórios.' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("e_commerce_db");

    // 3. Montar o objeto da avaliação
    const newReview = {
      _id: new ObjectId(), // Gera um ID único para a avaliação
      userId: new ObjectId(session.user.id),
      userName: session.user.name,
      rating: Number(rating),
      comment,
      createdAt: new Date(),
    };

    // 4. Adicionar a avaliação ao array 'reviews' do produto
    const result = await db.collection("produtos").updateOne(
      { _id: new ObjectId(productId) },
      { $push: { reviews: newReview } }
    );

    if (result.matchedCount === 0) {
        return NextResponse.json({ message: 'Produto não encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Avaliação adicionada com sucesso!', review: newReview }, { status: 201 });

  } catch (error) {
    console.error('Erro ao adicionar avaliação:', error);
    return NextResponse.json({
      message: "Erro interno do servidor ao adicionar avaliação.",
      error: error.message,
    }, { status: 500 });
  }
}