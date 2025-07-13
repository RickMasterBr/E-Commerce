import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  // No modo de desenvolvimento, usamos uma variável global para que o valor
  // seja preservado entre as recargas do módulo causadas pelo HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // No modo de produção, é melhor não usar uma variável global.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Exporta uma promessa do MongoClient. Ao fazer isso, o módulo que o consome pode ter a certeza
// de que receberá a promessa do MongoClient antes de tentar usá-la.
export default clientPromise