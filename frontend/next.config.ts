import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow all local IPs in development
  async headers() {
    return [
      {
        source: "/_next/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },

};

export default nextConfig;
