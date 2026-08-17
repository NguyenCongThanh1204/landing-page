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
  // Thêm phần cấu hình build tách file ở đây
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Tách React và React Router thành gói riêng
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'vendor-react';
            }
            // Tách các thư viện UI / Animation / Icons (nếu có)
            if (id.includes('lucide-react') || id.includes('framer-motion') || id.includes('lenis') || id.includes('@studio-freight')) {
              return 'vendor-ui';
            }
            // Các package còn lại gom vào gói vendor chung
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Nâng ngưỡng cảnh báo lên 1000 kB
  },
});