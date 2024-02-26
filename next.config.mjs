/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["**"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  staticPageGenerationTimeout: 1000,
};

export default nextConfig;
