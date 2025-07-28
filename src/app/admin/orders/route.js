import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';

// GET: Obter todos os pedidos (rota de administrador)
export async function GET(request) {
  const session = await getServerSession(authOptions);

  // Proteção básica: verifica se o usuário está logado.
  // Em um cenário real, você verificaria se session.user.role === 'admin'
  if (!session) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("e_commerce_db");
    
    // Busca todos os pedidos e os ordena pelos mais recentes primeiro
    const orders = await db.collection("orders").find({})
      .sort({ createdAt: -1 }) // -1 para ordem decrescente
      .toArray();

    return NextResponse.json(orders, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar pedidos:", error);
    return NextResponse.json({ message: 'Erro ao obter os pedidos', error: error.message }, { status: 500 });
  }
}