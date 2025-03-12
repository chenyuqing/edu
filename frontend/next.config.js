/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Will be connecting to the FastAPI backend
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8000/api/:path*',
      },
    ];
  },
  // For development mode, allow images from any source
  images: {
    domains: ['*'],
  },
  // Error handling for easier debugging
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig
