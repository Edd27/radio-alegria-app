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
      {
        hostname: "coverart.instant.audio",
      },
    ],
  },
};

export default nextConfig;
