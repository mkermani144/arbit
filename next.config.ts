import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['@patternglobal/ergo-sdk', '@minswap/sdk'],
  experimental: {
    ppr: true,
  },
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
