import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });

  try {
    const client = await clientPromise;
    const db = client.db("e_commerce_db");
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(session.user.id) },
      { projection: { orders: 1 } }
    );
    if (!user) return NextResponse.json({ message: 'Utilizador não encontrado' }, { status: 404 });

    return NextResponse.json({ orders: user.orders || [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao obter os pedidos', error: error.message }, { status: 500 });
  }
}