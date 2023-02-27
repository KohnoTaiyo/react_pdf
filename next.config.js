/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.otf$/i,
      type: "asset/resource",
    });
    return config;
  },
};

module.exports = nextConfig;
