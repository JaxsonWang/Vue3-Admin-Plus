/**
 *  Vite Plugin for fast creating SVG sprites.
 * https://github.com/anncwb/vite-plugin-svg-icons
 */
import path from 'path'
import { Plugin } from 'vite'
import SvgIconsPlugin from 'vite-plugin-svg-icons'

export const configSvgIconsPlugin = (isBuild: boolean): Plugin => SvgIconsPlugin({
  iconDirs: [path.resolve(process.cwd(), 'src/icons')],
  svgoOptions: isBuild,
  symbolId: 'icon-[dir]-[name]'
})
