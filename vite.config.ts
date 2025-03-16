import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { cpSync, copyFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';

// Use Node.js path resolution
const __dirname = process.cwd();

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-manifest-and-assets',
      buildEnd() {
        const distPath = resolve(__dirname, 'dist');
        const publicPath = resolve(__dirname, 'public');

        // Ensure dist directory exists
        if (!existsSync(distPath)) {
          mkdirSync(distPath, { recursive: true });
        }

        // Copy manifest.json
        copyFileSync(`${publicPath}/manifest.json`, `${distPath}/manifest.json`);

        // Copy background.js
        copyFileSync(`${publicPath}/background.js`, `${distPath}/background.js`);

        // Copy images folder recursively (Node 16+)
        const srcImages = `${publicPath}/images`;
        const destImages = `${distPath}/images`;

        if (existsSync(srcImages)) {
          cpSync(srcImages, destImages, { recursive: true });
        }
      }
    }
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});
