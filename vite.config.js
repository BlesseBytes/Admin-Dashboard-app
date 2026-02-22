import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use VERCEL environment variable for root, otherwise GitHub Pages subfolder
export default defineConfig({
  plugins: [react()],
  base: process.env.VERCEL ? '/' : '/Admin-Dashboard-app/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    port: 5173,
    open: true,
  },
});