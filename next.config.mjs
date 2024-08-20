/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '5002',
            pathname: '/uploads/**',
          },
        ],
      },
};

export default nextConfig;
