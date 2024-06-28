/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "cdn.instant.audio",
      },
    ],
  },
};

export default nextConfig;
