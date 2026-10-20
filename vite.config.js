import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  // 相对路径，方便部署到 GitHub Pages 的子目录
  base: './',
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 4000,
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        editor: resolve(import.meta.dirname, 'editor.html'),
      },
    },
  },
});
