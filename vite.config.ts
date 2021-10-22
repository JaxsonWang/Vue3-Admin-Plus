import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import ViteComponents from 'unplugin-vue-components/vite'
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
    Vue(),
    VueJsx(),
    configSvgIconsPlugin(command === 'build'),
    ViteComponents({
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass'
        })
      ],
      dts: 'types/components.d.ts'
    })
  ],
  server: {
    host: true
  }
}))
