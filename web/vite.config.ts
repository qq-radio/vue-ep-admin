import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import checker from 'vite-plugin-checker'

export default defineConfig(({ mode }) => {
  const { VITE_API_DOMAIN } = loadEnv(mode, process.cwd())

  return {
    base: '/',
    server: {
      port: 5003,
      open: true,
      proxy: {
        '/api': {
          target: VITE_API_DOMAIN,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          ws: true,
        },
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools(),
      UnoCSS(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        eslintrc: {
          enabled: true,
        },
        dirs: ['src/composables', 'src/store/modules'],
      }),
      checker({
        typescript: true,
      }),
    ],
    resolve: {
      alias: {
        '#': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
