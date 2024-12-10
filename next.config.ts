/* eslint-disable @typescript-eslint/no-explicit-any */
import { access, symlink } from 'fs/promises';
import type { NextConfig } from 'next';
import { join } from 'path';

const nextConfig: NextConfig = {
  webpack: function (config, { isServer }) {
    config.experiments = {
      asyncWebAssembly: true,
      syncWebAssembly: true,
      layers: true,
    };

    config.plugins.push(
      new (class {
        apply(compiler: any) {
          compiler.hooks.afterEmit.tapPromise(
            'SymlinkWebpackPlugin',
            async (compiler: any) => {
              if (isServer) {
                const from = join(compiler.options.output.path, '../static');
                const to = join(compiler.options.output.path, 'static');

                try {
                  await access(from);
                  console.log(`${from} already exists`);
                  return;
                } catch (error: any) {
                  if (error.code === 'ENOENT') {
                    // No link exists
                  } else {
                    throw error;
                  }
                }

                await symlink(to, from, 'junction');
                console.log(`created symlink ${from} -> ${to}`);
              }
            },
          );
        }
      })(),
    );

    return config;
  },
};

export default nextConfig;
