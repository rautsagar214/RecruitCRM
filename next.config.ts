import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true, // set to false if this is temporary
      },
    ];
  },
};

export default nextConfig;
