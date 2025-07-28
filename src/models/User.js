import mongoose from 'mongoose';

// --- NOVO: Schema para os endereços ---
const AddressSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Ex: "Casa", "Trabalho"
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
});


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email address.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: 6,
  },
  // Aqui vamos guardar o carrinho do usuário
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    }
  ],
  // --- ATUALIZADO: Adicionando os campos de endereço e pedidos ---
  addresses: [AddressSchema], // Usando o schema que definimos acima
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);