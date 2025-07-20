import Link from 'next/link';

// Função para buscar os produtos da API
async function getProducts() {
    // A URL foi ajustada para funcionar em ambientes de produção (Vercel) e desenvolvimento
    const apiUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/produtos` : 'http://localhost:3000/api/produtos';
    const res = await fetch(apiUrl, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Falha ao buscar os produtos');
    }
    return res.json();
}

export default async function ShopPage() {
    const products = await getProducts();

    return (
        <div className="bg-[#fcf8f8] px-4 sm:px-10 lg:px-40 py-5">
            <div className="max-w-[960px] mx-auto">
                <div className="flex flex-wrap justify-between items-center gap-3 p-4">
                    <h1 className="text-[#1b0e0f] tracking-light text-[32px] font-bold leading-tight min-w-72">
                        Supplements
                    </h1>
                </div>

                {/* Filtros */}
                <div className="flex gap-3 p-3 flex-wrap pr-4">
                    <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f3e7e8] pl-4 pr-2">
                        <p className="text-[#1b0e0f] text-sm font-medium leading-normal">Price</p>
                        <div className="text-[#1b0e0f]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                        </div>
                    </button>
                    <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f3e7e8] pl-4 pr-2">
                        <p className="text-[#1b0e0f] text-sm font-medium leading-normal">Category</p>
                        <div className="text-[#1b0e0f]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                        </div>
                    </button>
                    <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f3e7e8] pl-4 pr-2">
                        <p className="text-[#1b0e0f] text-sm font-medium leading-normal">Brand</p>
                        <div className="text-[#1b0e0f]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                        </div>
                    </button>
                    <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#f3e7e8] pl-4 pr-2">
                        <p className="text-[#1b0e0f] text-sm font-medium leading-normal">More Filters</p>
                        <div className="text-[#1b0e0f]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                        </div>
                    </button>
                </div>

                {/* Controles de visualização e ordenação */}
                <div className="flex justify-between gap-2 px-4 py-3">
                    <div className="flex gap-2">
                        <button className="p-2 text-[#1b0e0f]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
                        </button>
                        <button className="p-2 text-[#1b0e0f]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,80H136V56h64ZM120,56v64H56V56ZM56,136h64v64H56Zm144,64H136V136h64v64Z"></path></svg>
                        </button>
                    </div>
                    <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 bg-[#e82630] text-[#fcf8f8] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72A8,8,0,0,1,56,136h64V40a8,8,0,0,1,16,0v96h64a8,8,0,0,1,5.66,13.66Z"></path></svg>
                        <span className="truncate">Sort</span>
                    </button>
                </div>

                {/* Grade de Produtos */}
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-4 p-4">
                    {products.map((product) => (
                        // AQUI A MUDANÇA: O href agora é dinâmico
                        <Link href={`/shop/${product._id}`} key={product._id} className="flex flex-col gap-3 pb-3 group">
                            <div
                                className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                                style={{ backgroundImage: `url(${product.imagem || '/placeholder.jpg'})` }}
                            ></div>
                            <p className="text-[#1b0e0f] text-base font-medium leading-normal">{product.nome}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}