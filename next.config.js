/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['photo-resize-zmp3.zmdcdn.me'],
  },
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: 20000, // Pass through env variables
  },
}

module.exports = nextConfig
