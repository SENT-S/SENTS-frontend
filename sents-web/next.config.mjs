/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'worldbank.scene7.com' },
      { protocol: 'https', hostname: 'source.unsplash.com' },
      { protocol: 'https', hostname: 'flagsapi.com' },
      { protocol: 'https', hostname: 'unsplash.com' },
    ],
  },
};

export default nextConfig;
