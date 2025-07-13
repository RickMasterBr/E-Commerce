import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb'; // Importante para converter o ID string para um ObjectId do MongoDB

// --- FUNÇÃO DELETE: Para apagar um produto específico ---
export async function DELETE(request, { params }) {
  try {
    // O 'params' contém os segmentos dinâmicos do URL.
    // Neste caso, o ID do produto.
    const { id } = params;

    // Validação básica para ver se o ID foi fornecido
    if (!id) {
      return NextResponse.json({ message: 'ID do produto não fornecido.' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("e_commerce_db");

    // O comando deleteOne precisa de um filtro.
    // O _id no MongoDB é um objeto do tipo ObjectId, não uma simples string.
    // Por isso, precisamos de converter a string 'id' para um ObjectId.
    const result = await db.collection("produtos").deleteOne({
      _id: new ObjectId(id)
    });

    // Verificamos se algum documento foi realmente apagado.
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: 'Nenhum produto encontrado com este ID.' }, { status: 404 });
    }

    // Retorna uma resposta de sucesso.
    return NextResponse.json({ message: 'Produto apagado com sucesso!' }, { status: 200 });

  } catch (error) {
    console.error(error);
    // Se o ID for inválido, o new ObjectId(id) pode dar erro.
    if (error.name === 'BSONError') {
      return NextResponse.json({ message: 'ID do produto inválido.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Erro ao apagar o produto.' }, { status: 500 });
  }
}