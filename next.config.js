/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  eslint: {
    dirs: ['app'],
  },
  images: {
    domains: ['static.wixstatic.com', 'rotasia2024bengaluru.com'],
    formats: ['image/webp'],
  },
};

module.exports = nextConfig;
