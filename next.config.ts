import type { NextConfig } from "next";

/*
 * `output: "export"` turns the whole site into plain files (index.html,
 * CSS, JS, images) in the `out` folder when you run `npm run build`.
 * Vercel serves that folder as-is; any other host can too.
 */
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
