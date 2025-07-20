/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**', // Libera todos os domínios https
        },
        {
          protocol: 'http',
          hostname: '**', // Libera todos os domínios http
        },
      ],
    },
  };
  
  export default nextConfig;