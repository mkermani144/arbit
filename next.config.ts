import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: function (config) {
    config.experiments = {
      asyncWebAssembly: true,
      syncWebAssembly: true,
      layers: true,
    };
    return config;
  },
};

export default nextConfig;
