import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// --- FUNÇÃO GET: Para buscar todos os produtos ---
export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("e_commerce_db");
    const produtos = await db.collection("produtos").find({}).toArray();
    return NextResponse.json(produtos, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Erro ao buscar os produtos.",
      error: error.message,
    }, { status: 500 });
  }
}

// --- FUNÇÃO POST: Para criar um novo produto (COM A CORREÇÃO) ---
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("e_commerce_db");
    const productData = await request.json();

    // 1. Inserimos o produto
    const result = await db.collection("produtos").insertOne(productData);

    // Em vez de usar result.ops, que não existe mais,
    // vamos buscar o documento que acabamos de inserir usando o ID retornado.
    const insertedProduct = await db.collection("produtos").findOne({ _id: result.insertedId });

    // 3. Retornamos o documento completo que encontramos
    return NextResponse.json({
      message: "Produto criado com sucesso!",
      data: insertedProduct, // Retornamos o documento completo
    }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Erro ao criar o produto.",
      error: error.message,
    }, { status: 500 });
  }
}