/*
 * Copyright (c) 2021
 * 项目名称：Vue3-Admin-Plus
 * 文件名称：vue.config.js
 * 创建日期：2021/1/19 下午9:47
 * 创建作者：Jaxson
 */
const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '',
  outputDir: 'dist',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
