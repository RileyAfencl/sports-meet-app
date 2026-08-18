import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const webRoot = fileURLToPath(new URL('.', import.meta.url))
const assetsRoot = fileURLToPath(new URL('../assets', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@assets': assetsRoot,
    },
  },
  server: {
    fs: {
      allow: [webRoot, assetsRoot],
    },
  },
})
