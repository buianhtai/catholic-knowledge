import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'commons.wikimedia.org',
        pathname: '/wiki/Special:FilePath/**',
      },
    ],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1440],
    imageSizes: [96, 128, 160, 192, 256, 320],
  },
};

export default nextConfig;
