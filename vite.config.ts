import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
  server: {
    host: true,
    port: 8083,
    watch: {
      usePolling: true,
    },
  },
  preview: {
    host: true,
    port: 8083,
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    minify: true,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
})
