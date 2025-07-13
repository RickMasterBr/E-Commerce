import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// --- FUNÇÃO GET (por ID): Para buscar um único produto ---
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db("e_commerce_db");

    const product = await db.collection("produtos").findOne({ _id: new ObjectId(id) });

    if (!product) {
      return NextResponse.json({ message: 'Produto não encontrado.' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    console.error(error);
    if (error.name === 'BSONError') {
      return NextResponse.json({ message: 'ID do produto inválido.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Erro ao buscar o produto.' }, { status: 500 });
  }
}

// --- FUNÇÃO PUT: Para atualizar um produto existente ---
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db("e_commerce_db");

    // Pega nos dados enviados para atualização
    const updatedData = await request.json();

    // Remove o campo _id do objeto de atualização para evitar erros
    delete updatedData._id;

    const result = await db.collection("produtos").updateOne(
      { _id: new ObjectId(id) }, // Filtro para encontrar o documento certo
      { $set: updatedData }      // O operador $set atualiza os campos fornecidos
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ message: 'Nenhum produto encontrado com este ID para atualizar.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Produto atualizado com sucesso!' }, { status: 200 });

  } catch (error) {
    console.error(error);
    if (error.name === 'BSONError') {
      return NextResponse.json({ message: 'ID do produto inválido.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Erro ao atualizar o produto.' }, { status: 500 });
  }
}

// --- FUNÇÃO DELETE: Para apagar um produto (já a tínhamos) ---
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db("e_commerce_db");

    const result = await db.collection("produtos").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Nenhum produto encontrado com este ID.' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Produto apagado com sucesso!' }, { status: 200 });

  } catch (error) {
    console.error(error);
    if (error.name === 'BSONError') {
      return NextResponse.json({ message: 'ID do produto inválido.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Erro ao apagar o produto.' }, { status: 500 });
  }
}