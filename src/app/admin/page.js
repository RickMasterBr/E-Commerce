// src/app/admin/page.js

export default function AdminDashboardPage() {
    // No futuro, os dados virão de uma chamada à API
    const stats = [
      { title: "Vendas Totais", value: "R$ 12,345.00", icon: "💰" },
      { title: "Novos Pedidos", value: "42", icon: "📦" },
      { title: "Total de Produtos", value: "150", icon: "🛍️" },
      { title: "Novos Utilizadores", value: "8", icon: "👥" },
    ];
  
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center">
              <div className="text-4xl mr-4">{stat.icon}</div>
              <div>
                <p className="text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
  
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Pedidos Recentes</h2>
          {/* Aqui você pode renderizar uma tabela com os últimos pedidos */}
          <p className="text-gray-600">A funcionalidade da tabela de pedidos recentes será implementada aqui.</p>
        </div>
      </div>
    );
  }