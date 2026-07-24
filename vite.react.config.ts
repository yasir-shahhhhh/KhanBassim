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
      entry: {
        'about-react': 'src/about-react.tsx',
        'global-particles': 'src/global-particles.tsx'
      },
      name: 'ReactComponents',
      formats: ['es'],
    },
    rollupOptions: {
      // output formatting for multiple entries
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js',
      }
    }
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
});
