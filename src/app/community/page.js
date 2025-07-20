import Image from 'next/image';
import Link from 'next/link';

// Dados de exemplo para os artigos do blog
const featuredArticle = {
  category: 'Nutrition',
  title: 'Fuel Your Performance: The Ultimate Guide to Pre-Workout Nutrition',
  description: 'Maximize your workout potential with the right pre-workout fuel. Learn about the best foods and supplements to boost energy, enhance focus, and improve endurance.',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDIaKIrBeR36tyFN81aa7JIT8Ae-A3yuvJU_kn_D1rv4fNZ3ym003rIs-u0Wc5K6kVfD3pQbUHoL7_erfg0NfsSw8OY18g4tiX3q05uMax73gaT3DpVLW5qsTUHne0O2VqFtz2aPZ7otyG6wKQabvIiuSqDtFELpqordJzkxWRU2jCbK7aitTBuTE4MtL7U5DatyWS_wrV9Ko8L0TL74bSRpJXH4oa9Aryz_3PH9q_5ubN7OK33oT6DRXBGlJt0dsw6_Aa4kfLTyNx2',
};

const latestArticles = [
  {
    title: 'The Science of Muscle Recovery: Optimizing Post-Workout Nutrition',
    description: 'Learn how to speed up muscle recovery and reduce soreness with the right post-workout nutrition. Discover the best foods and supplements to support muscle repair and growth.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCID75apjwOdEet9L1tDxtOsU8ykv6NAko8pEsxOh5kTi8Ng2wjZZNoXrsU48yZOqb3Zy8JARsdVXoCme3H5XOC4baCp8i-vcBzp2TLQbNTQwU28dpSkYX2C4qERjj4Q1Kf5HmTFcWl1UAJYb5T5hNQzA7iXaJtcfgsK01cf5J3LFubKIQQkm_LyQxkQQF1OyriPru8T5WPYRXqXfiHjwMzEKRLQJ2vJkLKj2hr3w1CwXmUirLKbPoD3p7GHo96NuqYI8I_0N3sJvvw',
  },
  {
    title: 'Hydration for Athletes: Staying at Peak Performance',
    description: 'Understand the importance of hydration for athletic performance. Get tips on staying hydrated before, during, and after workouts to maintain energy levels and prevent dehydration.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5ds419wKDLXJfMucWbGIyit5FePPn-80o-qiF_kuquapzmVUy5eHjpM5yxYbao_xr_iRJBBOLRJy3y9WgNldt_3r6uwQMOsIY8GUW5qfYfhf2iaX5FownzrQ87a-nGEvTCtItoF5-chWmuYgGodHGFUCiU1hecbi9StmaWjmGTGK_P6wUgtkI5UURybNy-mf5sUMkPi5XbUl3yR5wTg9S5IF2FTF_bQ_79qjDncbVCbxPdoXUzWICD0vLt6zelkhNDHOCT5fYEO1p',
  },
  {
    title: 'The Role of Supplements in a Balanced Diet',
    description: 'Explore the role of supplements in a balanced diet. Learn how to choose the right supplements to support your fitness goals and overall health.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBP0PkQ_QebtCllzPtZuwjtISaF_RjE4V-l-PdpsapjNV3ny-HNFYRE_dvbjWUuWOl1qSjoiMbrSfEuDlSGVoi7127fztLseAnpomCF0a5n65AxyxxxC5_pLWLtWZAXyVxPQkgBWNjLz_9JQEYrl5dHxeRtxgUEOgITSXjuaf_t-ZnFZl_v4a2W1G5r7DHifedT7xyBntia2VwvXEB5dN4LSuWCSbPga_V7iQI0NqgcBHx1Z9-tdCbzRoLJIz4ZErxfOMTV32H75Tv1',
  },
  {
    title: 'Building Strength: Advanced Training Techniques',
    description: 'Take your strength training to the next level with advanced techniques. Learn about progressive overload, periodization, and other strategies to maximize muscle growth and strength gains.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaFI6pYvLwimgfY5K2XSYITR-Y2ufcHmh2kYfjlgmRKhIKVFJyY7_YnoHRdf2XuJCrxJkWFG3RaYr84ElmlJzREBPuAt001I4d8DyDW0uDYSXQU_6MiyT1IyfwsnbLX5_88khf5WwqfEMwtEvZY6AeQ6vWeBbLYAlR3mckk_C7vKk3n8wBbyuubsb9nVu3656MgUWQQlnTgGcd-6ElaKCzUbbei4NBXY-i_6i8bGeXB-re0LV5fOHZaNtMOkZAk7BPzIukd3946XK-',
  },
];

export default function CommunityPage() {
  return (
    <div className="bg-[#fcf8f8] px-4 sm:px-10 lg:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 mx-auto">
        
        <div className="p-4">
          <h1 className="text-[#1b0e0f] tracking-light text-[32px] font-bold leading-tight min-w-72">The FitFuel Blog</h1>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div className="text-[#974e52] flex border-none bg-[#f3e7e8] items-center justify-center pl-4 rounded-l-xl border-r-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
              </div>
              <input placeholder="Search articles" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1b0e0f] focus:outline-0 focus:ring-0 border-none bg-[#f3e7e8] focus:border-none h-full placeholder:text-[#974e52] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal" />
            </div>
          </label>
        </div>

        {/* Featured Article */}
        <h2 className="text-[#1b0e0f] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Featured</h2>
        <div className="p-4">
          <div className="flex flex-col items-stretch justify-start rounded-xl md:flex-row md:items-start">
            <div className="relative w-full aspect-video md:flex-1">
              <Image src={featuredArticle.imageUrl} alt={featuredArticle.title} fill style={{ objectFit: 'cover' }} className="rounded-xl" />
            </div>
            <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 md:flex-1 md:px-4">
              <p className="text-[#974e52] text-sm font-normal leading-normal">{featuredArticle.category}</p>
              <p className="text-[#1b0e0f] text-lg font-bold leading-tight tracking-[-0.015em]">{featuredArticle.title}</p>
              <p className="text-[#974e52] text-base font-normal leading-normal">{featuredArticle.description}</p>
            </div>
          </div>
        </div>

        {/* Latest Articles */}
        <h2 className="text-[#1b0e0f] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Latest Articles</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 p-4">
          {latestArticles.map((article) => (
            <div key={article.title} className="flex flex-col gap-3 pb-3 group">
              <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                <Image src={article.imageUrl} alt={article.title} fill style={{ objectFit: 'cover' }} className="transition-transform duration-300 group-hover:scale-105" />
              </div>
              <div>
                <p className="text-[#1b0e0f] text-base font-medium leading-normal">{article.title}</p>
                <p className="text-[#974e52] text-sm font-normal leading-normal mt-1">{article.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-center p-4">
            <Link href="#" className="flex size-10 items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path></svg></Link>
            <Link href="#" className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-[#1b0e0f] rounded-full bg-[#f3e7e8]">1</Link>
            <Link href="#" className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#1b0e0f] rounded-full">2</Link>
            <Link href="#" className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#1b0e0f] rounded-full">3</Link>
            <Link href="#" className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#1b0e0f] rounded-full">4</Link>
            <Link href="#" className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-[#1b0e0f] rounded-full">5</Link>
            <Link href="#" className="flex size-10 items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" fill="currentColor" viewBox="0 0 256 256"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg></Link>
        </div>

      </div>
    </div>
  );
}