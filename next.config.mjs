const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const repo = "Cakeshop";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGithubPages && {
    output: "export",
    basePath: `/${repo}`,
    assetPrefix: `/${repo}/`,
    images: {
      loader: "custom",
      loaderFile: "./image-loader.js",
    },
  }),
};

export default nextConfig;