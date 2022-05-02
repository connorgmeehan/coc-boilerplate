import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      { find: '~', replacement: path.resolve(__dirname, './src') },
    ],
  },
  server: {
    fs: {
      allow: ['.'],
    },
  },
})
