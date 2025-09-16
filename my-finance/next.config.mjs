/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "silver-doodle-56rx5pv6wqv2vxrr-3000.app.github.dev",
      ],
    },
  },
};

export default nextConfig;
