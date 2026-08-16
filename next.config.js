/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    formats: ['image/webp'],
    deviceSizes: [390, 640, 750, 828, 1080],
    imageSizes: [64, 128, 256, 384],
  },
}

module.exports = nextConfig
