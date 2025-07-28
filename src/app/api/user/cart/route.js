import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET: Obter o carrinho do utilizador logado
export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("e_commerce_db");
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(session.user.id) },
      { projection: { cart: 1 } } // Apenas retorna o campo do carrinho
    );

    if (!user) {
      return NextResponse.json({ message: 'Utilizador não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ cart: user.cart || [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao obter o carrinho', error: error.message }, { status: 500 });
  }
}

// POST: Atualizar o carrinho do utilizador logado
export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const { cart } = await request.json();
    const client = await clientPromise;
    const db = client.db("e_commerce_db");

    await db.collection("users").updateOne(
      { _id: new ObjectId(session.user.id) },
      { $set: { cart: cart } } // Substitui o carrinho antigo pelo novo
    );

    return NextResponse.json({ message: 'Carrinho atualizado com sucesso' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao atualizar o carrinho', error: error.message }, { status: 500 });
  }
}