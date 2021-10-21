import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { configSvgIconsPlugin } from './build/vite/plugins'

const resolve = (dir: string): string => {
  return path.join(__dirname, dir)
}

/**
 * vite 配置项
 * https://vitejs.dev/config/
 */
export default defineConfig(({ command }) => ({
  root: process.cwd(),
  base: './',
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: resolve('src') + '/'
      }
    ]
  },
  plugins: [
    vue(),
    vueJsx(),
    configSvgIconsPlugin(command === 'build'),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dts: true
    })
  ],
  server: {
    host: true
  }
}))
