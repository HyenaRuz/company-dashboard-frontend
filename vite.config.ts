import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [
    react({
      // Для поддержки MUI с Emotion (sx, theme)
      jsxImportSource: '@emotion/react',
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  define: {
    // Если ты хочешь использовать process.env.XY в коде
    'process.env': {},
  },
  server: {
    port: 8082, // можно изменить на 3000 или 8080
    open: true, // автоматическое открытие браузера
  },
});