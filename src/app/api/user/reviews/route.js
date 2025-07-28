import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET: Obter todas as avaliações de um utilizador específico
export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("e_commerce_db");
    
    // Usaremos um "aggregation pipeline" para encontrar e formatar os dados
    const reviews = await db.collection("produtos").aggregate([
      // 1. Desconstruir (unwind) o array de avaliações para tratar cada uma como um documento separado
      { $unwind: "$reviews" },
      
      // 2. Filtrar para encontrar apenas as avaliações que correspondem ao ID do utilizador logado
      { $match: { "reviews.userId": new ObjectId(session.user.id) } },
      
      // 3. Reformatar a saída para ser mais útil no frontend
      {
        $project: {
          _id: "$reviews._id",
          productId: "$_id",
          productName: "$nome",
          productImage: "$imagem",
          rating: "$reviews.rating",
          comment: "$reviews.comment",
          createdAt: "$reviews.createdAt"
        }
      },
      
      // 4. Ordenar as avaliações pelas mais recentes
      { $sort: { createdAt: -1 } }
    ]).toArray();

    return NextResponse.json({ reviews: reviews }, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar avaliações do utilizador:", error);
    return NextResponse.json({ message: 'Erro ao obter as avaliações', error: error.message }, { status: 500 });
  }
}