import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(), // Đồng bộ path alias từ tsconfig.json
  ],
  resolve: {
    alias: {
      '@': '/src', // Hỗ trợ import @/api/orderApi
    },
  },
});
