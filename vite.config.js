import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/components-collection/',
  
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'src/pages/about.html'),
      }
    },
    // Включаем обработку assets
    assetsInlineLimit: 4096, // файлы меньше 4kb инлайнятся
  },
  
  // Оптимизация для изображений
  optimizeDeps: {
    include: ['sharp']
  },
  
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`
      }
    }
  },
  
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  
  server: {
    port: 3000,
    open: true
  }
})