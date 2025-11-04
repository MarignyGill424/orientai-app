import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const clientRoot = path.resolve(__dirname, 'src/client');

export default defineConfig({
  root: clientRoot,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, 'shared')
    }
  },
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(clientRoot, 'index.html')
    }
  }
});
