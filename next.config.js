/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
      },

      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com", // Replace with your blob hostname
        port: "",
        pathname: "/**", // Allow all paths under this hostname
      },
    ],
  },
};

export default config;
