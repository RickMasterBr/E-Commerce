// Função para buscar os dados da nova API
async function getOrders() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    // É importante passar os cookies da sessão para a API entender que estamos logados.
    // O Next.js faz isso automaticamente em Server Components se o fetch for feito corretamente.
    const res = await fetch(`${apiUrl}/api/admin/orders`, { cache: 'no-store' });
    
    if (!res.ok) {
        // Se a API retornar um erro de não autorizado, podemos tratar aqui
        if (res.status === 401) {
            console.error("Acesso não autorizado à API de pedidos.");
            return [];
        }
        throw new Error('Falha ao buscar os pedidos');
    }
    return res.json();
}

export default async function AdminOrdersPage() {
    const orders = await getOrders();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Pedidos</h1>
            <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID do Pedido</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <tr key={order._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500" title={order._id}>
                                        {/* Mostra apenas os últimos 6 caracteres do ID para economizar espaço */}
                                        ...{order._id.slice(-6)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">R$ {order.summary.total.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">Detalhes</a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">Nenhum pedido encontrado.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}