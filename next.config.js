/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['i.scdn.co'],
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        return config;
    },
    // Add the experimental feature if you want to use it, but be aware of the potential risks
  experimental: {
    images: true,
  },
  // Enable static HTML export
  // This will generate static HTML files for your Next.js application
  target: 'experimental-serverless-trace', // Use experimental-serverless-trace to enable static HTML export
    
}

module.exports = nextConfig
