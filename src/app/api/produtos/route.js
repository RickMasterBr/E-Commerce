import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// Validação de entrada
function validateProductData(data) {
  const errors = [];
  
  if (!data.nome || typeof data.nome !== 'string' || data.nome.trim().length < 2) {
    errors.push('Nome do produto é obrigatório e deve ter pelo menos 2 caracteres');
  }
  
  if (!data.preco || typeof data.preco !== 'number' || data.preco <= 0) {
    errors.push('Preço deve ser um número positivo');
  }
  
  if (!data.categoria || typeof data.categoria !== 'string') {
    errors.push('Categoria é obrigatória');
  }
  
  if (!data.stock || typeof data.stock !== 'number' || data.stock < 0) {
    errors.push('Stock deve ser um número não negativo');
  }
  
  return errors;
}

// GET: Buscar produtos com filtros e paginação
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.trim();
    const category = searchParams.get('category')?.trim();
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = Math.min(parseInt(searchParams.get('limit')) || 12, 50); // Máximo 50 por página
    const sortBy = searchParams.get('sortBy') || 'nome';
    const sortOrder = searchParams.get('sortOrder') === 'desc' ? -1 : 1;

    const client = await clientPromise;
    const db = client.db("e_commerce_db");

    // Construir query
    let query = {};

    if (search) {
      query.$or = [
        { nome: { $regex: search, $options: 'i' } },
        { descricao: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      query.categoria = { $regex: category, $options: 'i' };
    }

    // Calcular skip para paginação
    const skip = (page - 1) * limit;

    // Buscar produtos com paginação
    const produtos = await db.collection("produtos")
      .find(query)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Contar total de produtos para paginação
    const total = await db.collection("produtos").countDocuments(query);

    // Calcular informações de paginação
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      produtos,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({
      message: "Erro interno do servidor ao buscar produtos.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    }, { status: 500 });
  }
}

// POST: Criar novo produto
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("e_commerce_db");
    
    const productData = await request.json();

    // Validar dados do produto
    const validationErrors = validateProductData(productData);
    if (validationErrors.length > 0) {
      return NextResponse.json({
        message: "Dados inválidos",
        errors: validationErrors
      }, { status: 400 });
    }

    // Adicionar timestamp
    const productWithTimestamp = {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection("produtos").insertOne(productWithTimestamp);

    const insertedProduct = await db.collection("produtos").findOne({ 
      _id: result.insertedId 
    });

    return NextResponse.json({
      message: "Produto criado com sucesso!",
      data: insertedProduct,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({
      message: "Erro interno do servidor ao criar produto.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    }, { status: 500 });
  }
}

// PUT: Atualizar produto (opcional)
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({
        message: "ID do produto é obrigatório"
      }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("e_commerce_db");
    
    const updateData = await request.json();
    
    // Validar dados de atualização
    const validationErrors = validateProductData(updateData);
    if (validationErrors.length > 0) {
      return NextResponse.json({
        message: "Dados inválidos",
        errors: validationErrors
      }, { status: 400 });
    }

    const { ObjectId } = await import('mongodb');
    
    const result = await db.collection("produtos").updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          ...updateData,
          updatedAt: new Date()
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({
        message: "Produto não encontrado"
      }, { status: 404 });
    }

    return NextResponse.json({
      message: "Produto atualizado com sucesso!"
    }, { status: 200 });

  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({
      message: "Erro interno do servidor ao atualizar produto.",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    }, { status: 500 });
  }
}