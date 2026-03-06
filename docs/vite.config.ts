import { fileURLToPath, URL } from 'url'
import type { AliasOptions } from 'vite'
import { defineConfig } from 'vite'
import autoImport from 'unplugin-auto-import/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import checker from 'vite-plugin-checker'
import { markdownTransform } from './plugins'

const pathResolve = (dir: string): string => fileURLToPath(new URL(dir, import.meta.url))

const alias: AliasOptions = {
  '@components': pathResolve('../src/components'),
  '@mocks': pathResolve('./mocks'),
}

export default defineConfig(() => {
  return {
    server: {
      port: 5000,
      host: true,
      open: true,
    },
    resolve: {
      alias: alias,
    },
    plugins: [
      autoImport({
        imports: ['vue'],
        eslintrc: {
          enabled: true,
        },
      }),
      vueJsx(),
      checker({
        typescript: true,
      }),
      markdownTransform(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern',
        },
      },
    },
  }
})
