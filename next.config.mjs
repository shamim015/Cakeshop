/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
// GitHub repo name = "Cakeshop" (case-sensitive!)
const basePath = isProd ? "/Cakeshop" : "";

export default {
  reactStrictMode: true,
  output: "export",          // static site for GitHub Pages
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./image-loader.js",
  },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
