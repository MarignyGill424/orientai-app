import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'src/client'),
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@shared': path.resolve(__dirname, '../../shared')
    }
  },
  server: {
    port: 3000,
    host: true,         // ← autorise l'accès réseau (localhost + IP locale)
    strictPort: true,   // ← empêche Vite de changer de port
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
    input: path.resolve(__dirname, 'src/client/index.html')
  }
}


});
