import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
    },
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Nhóm riêng React & Router
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/react-router') || id.includes('/@remix-run/')) {
              return 'vendor-react';
            }
            // Nhóm riêng thư viện UI / Animation
            if (id.includes('lucide-react') || id.includes('framer-motion') || id.includes('lenis') || id.includes('@studio-freight')) {
              return 'vendor-ui';
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});