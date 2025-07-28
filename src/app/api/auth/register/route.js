import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Todos os campos são obrigatórios.' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("e_commerce_db");
    const usersCollection = db.collection("users");

    // Verificar se o usuário já existe
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'O e-mail já está em uso.' }, { status: 409 });
    }

    // Encriptar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar o novo usuário
    const result = await usersCollection.insertOne({
      name,
      email,
      password: hashedPassword,
      cart: [], // Inicia com um carrinho vazio
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Usuário criado com sucesso!', userId: result.insertedId }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao criar o usuário.' }, { status: 500 });
  }
}