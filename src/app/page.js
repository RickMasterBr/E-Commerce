// --- Função para buscar os dados da nossa própria API ---
// Esta função será executada no servidor, tornando a busca de dados muito rápida.
async function getProducts() {
  // Usamos 'http://localhost:3000' porque a busca é feita no lado do servidor
  // onde a aplicação está a correr.
  const res = await fetch('http://localhost:3000/api/produtos', {
    // 'no-store' garante que os dados são sempre buscados novamente (não ficam em cache),
    // o que é bom para vermos as nossas alterações imediatamente em desenvolvimento.
    cache: 'no-store',
  });

  if (!res.ok) {
    // Se a resposta não for bem-sucedida, lançamos um erro.
    throw new Error('Falha ao buscar produtos da API');
  }

  return res.json();
}


// --- O Componente da nossa Página Principal ---
// Marcamos a página como 'async' para podermos usar 'await' dentro dela.
export default async function HomePage() {
  // Chamamos a função para buscar os produtos e esperamos pelo resultado.
  const products = await getProducts();

  return (
    <main className="p-8">
      <h1 className="text-4xl font-bold text-center mb-12">
        Nosso Catálogo de Produtos
      </h1>

      {/* Verificação para o caso de não haver produtos */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
      ) : (
        // Grid para organizar os cartões de produto
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Usamos .map() para criar um cartão para cada produto */}
          {products.map((product) => (
            // O 'key' é essencial para o React identificar cada item da lista de forma única.
            <div key={product._id} className="border rounded-lg p-6 shadow-lg bg-white flex flex-col hover:shadow-xl transition-shadow duration-300">
              
              {/* Secção de Informações do Produto */}
              <div className="flex-grow">
                <h2 className="text-2xl font-semibold mb-2">{product.nome}</h2>
                <p className="text-gray-500 mb-4">{product.categoria}</p>
                
                {/* Detalhes específicos do produto */}
                <div className="bg-gray-50 p-3 rounded-md mb-4">
                  <h3 className="font-bold mb-2 text-sm text-gray-600">Detalhes:</h3>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {Object.entries(product.detalhes).map(([key, value]) => (
                      <li key={key}>
                        <span className="font-semibold capitalize">{key}:</span> {String(value)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Secção de Preço e Stock */}
              <div className="mt-auto pt-4 border-t">
                <p className="text-3xl font-light text-right">R$ {product.preco.toFixed(2)}</p>
                <p className="text-sm text-gray-400 text-right mt-1">
                  {product.stock} unidades em stock
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}