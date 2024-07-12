/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: "cdn.instant.audio",
      },
      {
        hostname: "ui-avatars.com",
      },
    ],
  },
};

export default nextConfig;
