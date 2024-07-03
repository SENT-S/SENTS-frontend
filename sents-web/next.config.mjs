/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'source.unsplash.com' },
      { protocol: 'https', hostname: 'flagsapi.com' },
      { protocol: 'https', hostname: 'unsplash.com' },
    ],
    domains: ['source.unsplash.com', 'flagsapi.com', 'unsplash.com'],
  },
};

export default nextConfig;
