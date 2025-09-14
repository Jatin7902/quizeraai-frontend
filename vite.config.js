import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: '0.0.0.0',
    cors: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
    },
    allowedHosts: true,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts', '.json'],
    alias: {
      '@': path.resolve(process.cwd(), './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [
        '@babel/parser',
        '@babel/traverse',
        '@babel/generator',
        '@babel/types'
      ]
    }
  }
});
