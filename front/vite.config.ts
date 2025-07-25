/// <reference types="vitest" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslintPlugin from 'vite-plugin-eslint';
import svgrPlugin from 'vite-plugin-svgr';
import { VitePluginFonts } from 'vite-plugin-fonts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    eslintPlugin({ failOnError: true }),
    react(),
    svgrPlugin({ svgrOptions: { configFile: '.svgrrc.json' } }),
    VitePluginFonts({
      custom: {
        families: [
          // {
          //   name: 'ploni',
          //   local: 'Ploni',
          //   src: 'src/assets/fonts/Ploni/Ploni*',
          // },
        ],
      },
      google: {
        families: ['Rubik'],
      },
    }),
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      exclude: ['./constants/config.ts'],
    },
    deps: {
      inline: ['vitest-canvas-mock'],
    },
  },
});
