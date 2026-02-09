import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  reactCompiler: true,
  async rewrites() {
    const backendUrl = process.env.BACKEND_INTERNAL_URL || 'http://todo-backend';
    return [
      {
        source: '/_api/:path*',
        destination: `${backendUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
