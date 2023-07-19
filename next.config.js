/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    output: 'export',
    images: {
        loader: 'custom',
        loaderFile: './app/image.ts',
      },
}

module.exports = nextConfig
