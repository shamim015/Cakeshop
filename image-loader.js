// Adds the GitHub Pages basePath (/Cakeshop) in front of every image in /public
export default function imageLoader({ src }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${src}`;
}
