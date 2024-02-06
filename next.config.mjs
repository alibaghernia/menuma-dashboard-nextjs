import withSerwistInit from "@serwist/next";
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
    unoptimized: true,
  },
};

export default withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV == "development",
})(nextConfig);
