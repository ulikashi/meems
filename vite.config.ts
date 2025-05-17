import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Определяем базовый URL для GitHub Pages - для локальной разработки это './', для продакшена это имя репозитория
const baseUrl = process.env.NODE_ENV === 'production' ? '/MeemsApp/' : './';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: baseUrl,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
});

