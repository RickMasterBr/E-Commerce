import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// --- FUNÇÃO GET ATUALIZADA: Para buscar produtos com filtros ---
export async function GET(request) {
  try {
    // Extrai os parâmetros de busca da URL da requisição
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    const client = await clientPromise;
    const db = client.db("e_commerce_db");

    // Monta o objeto de query para o MongoDB
    let query = {};

    if (search) {
      // Cria uma busca por texto insensível a maiúsculas/minúsculas no nome do produto
      query.nome = { $regex: search, $options: 'i' };
    }

    if (category) {
      // Filtra pela categoria exata
      query.categoria = category;
    }

    const produtos = await db.collection("produtos").find(query).toArray();
    return NextResponse.json(produtos, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Erro ao buscar os produtos.",
      error: error.message,
    }, { status: 500 });
  }
}

// --- FUNÇÃO POST (sem alterações) ---
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("e_commerce_db");
    const productData = await request.json();

    const result = await db.collection("produtos").insertOne(productData);

    const insertedProduct = await db.collection("produtos").findOne({ _id: result.insertedId });

    return NextResponse.json({
      message: "Produto criado com sucesso!",
      data: insertedProduct,
    }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Erro ao criar o produto.",
      error: error.message,
    }, { status: 500 });
  }
}