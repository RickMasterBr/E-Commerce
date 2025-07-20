import Image from 'next/image';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Dr. Emily Carter',
      role: 'Chief Science Officer',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuzRZ9WehSYIsrzNYeG-uA65odwV6zJk1adRUMEGtFCpkz4Ge3iAz6jlfvKfzxo4v3dQ2ZUsK2HvoGeH8FiEifqmZCNVMV4jXLTgOLVFtx6hS4T202OgaZHdiolzAnaNkgU2fJanF4MbVhG8FLoDOsaZcqqlGMmF4LBdhggaYeUiy_cQJVqTu3aZj9fZ_K4z6xhDHhWB2YofqptxgbE9xGL9iI9kOAx64h5h9rgWmhix0jyMghPOpey0J4oIJ1SK1vVHm4Q4WUIIzQ',
    },
    {
      name: 'Mark Johnson',
      role: 'Head of Product Development',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhjcAz1Nboy9ontNVCs9SN3yWo7E6drf8NLKsh-WWk2JNfHQvwuO9McM0ziZjhGBBgDlJ_2DcBjusD9KwUxVzXO1ZEcjDwYGk-9CMF5YL7rRgycbeCG51QQ0AVoQLqM26dfU0qKzCWIxlSEipbwdcAb0k9KQ9VkT4UHlVLDQoiUgh3b4KNMWXQJjNfuqe3pu1Jd5nW5qkONPDMw_NIq2j1MtmnrLT4VbUihIf28LC40-U55Cn2KU4lSQQM18Gx4XuaY7PPdJz6memS',
    },
    {
      name: 'Sarah Lee',
      role: 'Customer Support Manager',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqB9PJ-r2TBssjX89JkwZlhyEjV7kjyUUYG386JZq0wOOJDAaAfEI40IrDYm0aTU_8FpOZb5bvlE1k3e4qbnisC1sAAvvtfT3KWE-LqNM-qAOTyoRlP2B2kNOzbrI-YUU4Jh5eOZJf8gRVCm6YzW5YJPFUu7gmsuo2VdTkJtEQdgN5jAkr27Mt2aBYTV4-Cf4L2cJKXz0kQcM-MSUUUzzUagssH_TQy57HVrde52B7ghCFFe1MwGaw3RyLIo1mIsE_X6dWjlA2syVj',
    },
  ];

  return (
    <div className="bg-[#fcf8f8] px-4 sm:px-10 lg:px-40 py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1 mx-auto">
        
        <div className="p-4">
          <h1 className="text-[#1b0e0f] tracking-light text-[32px] font-bold leading-tight min-w-72">Our Story</h1>
        </div>
        
        <p className="text-[#1b0e0f] text-base font-normal leading-normal pb-3 pt-1 px-4">
          At Peak Performance, our mission is to empower athletes of all levels to achieve their peak potential through science-backed nutrition and unwavering support. We envision a world where every athlete has access to the resources they need to excel, and we are committed to providing the highest quality supplements and educational content to make that vision a reality. [cite: 109, 110]
        </p>

        <h2 className="text-[#1b0e0f] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Our History</h2>
        
        <p className="text-[#1b0e0f] text-base font-normal leading-normal pb-3 pt-1 px-4">
          Founded in 2015 by a team of sports scientists and nutrition experts, Peak Performance was born out of a passion for optimizing athletic performance. We recognized a gap in the market for supplements that were both effective and safe, and we set out to create a brand that athletes could trust. Over the years, we have grown from a small startup to a leading provider of sports supplements, serving athletes across various disciplines. [cite: 112, 113]
        </p>

        <h2 className="text-[#1b0e0f] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Our Team</h2>
        
        <p className="text-[#1b0e0f] text-base font-normal leading-normal pb-3 pt-1 px-4">
          Our team is comprised of experienced professionals with a deep understanding of sports science, nutrition, and athletic performance. From our product development specialists to our customer support representatives, we are all dedicated to helping athletes reach their goals. We believe in transparency, integrity, and a relentless pursuit of excellence, and these values are reflected in everything we do. [cite: 115, 116]
        </p>
        
        <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-4 p-4">
          {teamMembers.map((member) => (
            <div key={member.name} className="flex flex-col gap-3 text-center pb-3">
              <div className="px-4">
                <div className="relative w-full aspect-square rounded-full overflow-hidden">
                  <Image
                    src={member.imageUrl}
                    alt={`Portrait of ${member.name}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
              <div>
                <p className="text-[#1b0e0f] text-base font-medium leading-normal">{member.name}</p>
                <p className="text-[#974e52] text-sm font-normal leading-normal">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-[#1b0e0f] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Our Commitment</h2>
        
        <p className="text-[#1b0e0f] text-base font-normal leading-normal pb-3 pt-1 px-4">
          We are committed to providing athletes with the highest quality supplements, formulated with the latest scientific research and manufactured to the strictest standards. We believe in transparency and honesty, and we are always available to answer your questions and provide support. Our goal is to be your trusted partner on your journey to peak performance. [cite: 127, 128, 129]
        </p>

      </div>
    </div>
  );
}