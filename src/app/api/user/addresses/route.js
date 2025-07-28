import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// --- GET (Função existente) ---
export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });

  try {
    const client = await clientPromise;
    const db = client.db("e_commerce_db");
    const user = await db.collection("users").findOne(
      { _id: new ObjectId(session.user.id) },
      { projection: { addresses: 1 } }
    );
    if (!user) return NextResponse.json({ message: 'Utilizador não encontrado' }, { status: 404 });
    
    return NextResponse.json({ addresses: user.addresses || [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao obter os endereços', error: error.message }, { status: 500 });
  }
}

// --- NOVO: Função POST para adicionar um novo endereço ---
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Não autorizado' }, { status: 401 });
  }

  try {
    const newAddress = await request.json();

    // Validação simples dos dados
    if (!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.zip) {
        return NextResponse.json({ message: 'Campos obrigatórios em falta.' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("e_commerce_db");

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(session.user.id) },
      { $push: { addresses: newAddress } } // $push adiciona o novo endereço ao array
    );

    if (result.modifiedCount === 0) {
        return NextResponse.json({ message: 'Não foi possível adicionar o endereço.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Endereço adicionado com sucesso!', address: newAddress }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao adicionar o endereço.', error: error.message }, { status: 500 });
  }
}