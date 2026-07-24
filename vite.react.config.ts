import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    outDir: 'dist-react',
    lib: {
      entry: 'src/about-react.tsx',
      name: 'AboutReact',
      formats: ['iife'],
      fileName: () => 'about-react.js'
    },
    rollupOptions: {
      // Intentionally not externalizing react/react-dom so they bundle
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});
