import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// --- FUNÇÃO POST: Para criar um novo pedido ---
export async function POST(request) {
  // 1. Proteger a rota: verificar se o usuário está autenticado
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Não autorizado. Faça login para continuar.' }, { status: 401 });
  }

  try {
    const { customerData, items, summary } = await request.json();

    // 2. Validar os dados recebidos (pode ser mais robusto em um projeto real)
    if (!customerData || !items || !summary || items.length === 0) {
      return NextResponse.json({ message: 'Dados do pedido incompletos.' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("e_commerce_db");

    // 3. Montar o objeto do pedido
    const newOrder = {
      userId: new ObjectId(session.user.id),
      customer: {
        name: `${customerData.firstName} ${customerData.lastName}`,
        email: customerData.email,
        phone: customerData.phone,
        address: {
          street: customerData.address,
          city: customerData.city,
          state: customerData.state,
          postalCode: customerData.postalCode,
          country: customerData.country,
        },
      },
      items: items.map(item => ({
        productId: new ObjectId(item._id),
        nome: item.nome,
        preco: item.preco,
        quantity: item.quantity,
      })),
      summary: {
        subtotal: summary.subtotal,
        shipping: summary.shipping,
        total: summary.total,
      },
      status: 'Processing', // Status inicial do pedido
      createdAt: new Date(),
    };

    // 4. Inserir o pedido na coleção 'orders'
    const ordersCollection = db.collection("orders");
    const result = await ordersCollection.insertOne(newOrder);

    // 5. (Opcional, mas recomendado) Adicionar o ID do pedido ao array de pedidos do usuário
    await db.collection("users").updateOne(
      { _id: new ObjectId(session.user.id) },
      { $push: { orders: result.insertedId } }
    );

    // 6. Retornar uma resposta de sucesso com o ID do novo pedido
    return NextResponse.json({
      message: "Pedido criado com sucesso!",
      orderId: result.insertedId,
    }, { status: 201 });

  } catch (error) {
    console.error('Erro ao criar o pedido:', error);
    return NextResponse.json({
      message: "Erro interno do servidor ao criar o pedido.",
      error: error.message,
    }, { status: 500 });
  }
}