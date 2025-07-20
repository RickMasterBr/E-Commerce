import Image from 'next/image';
import Link from 'next/link';

async function getProducts() {
  const apiUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/produtos` : 'http://localhost:3000/api/produtos';
  const res = await fetch(apiUrl, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Falha ao buscar os produtos');
  }
  return res.json();
}

export default async function WishlistPage() {
  const products = await getProducts();
  const wishlistItems = products.slice(0, 4); // Pega os 4 primeiros produtos como exemplo

  return (
    <div className="bg-[#fbf9f9] px-4 sm:px-10 lg:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 mx-auto">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <h1 className="text-[#191011] tracking-light text-[32px] font-bold leading-tight min-w-72">
            Saved Items
          </h1>
        </div>
        <h3 className="text-[#191011] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
          Items
        </h3>

        <div className="flex flex-col">
          {wishlistItems.map((item) => (
            <div key={item._id} className="p-4">
              <div className="flex items-stretch justify-between gap-4 rounded-xl">
                <div className="flex flex-[2_2_0px] flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="text-[#8b5b5d] text-sm font-normal leading-normal">Save for later</p>
                    <p className="text-[#191011] text-base font-bold leading-tight">{item.nome}</p>
                    <p className="text-[#8b5b5d] text-sm font-normal leading-normal">{item.detalhes?.tamanho || ' '}</p>
                  </div>
                  <div className="flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#f1e9ea] text-[#191011] text-sm font-medium leading-normal w-fit">
                    <span className="truncate">$ {item.preco.toFixed(2)}</span>
                  </div>
                </div>
                <div className="relative w-full aspect-video rounded-xl flex-1 overflow-hidden">
                    <Image
                        src={item.imagem || '/placeholder.jpg'}
                        alt={item.nome}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}