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
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'components', 'lib', 'utils', 'hooks'],
  },
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
