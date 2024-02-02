import withSerwistInit from "@serwist/next";
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV == "development",
})(nextConfig);
