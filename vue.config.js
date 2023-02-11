const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    // 修改dev期间的端口号
    port:3000,
    // 自动打开浏览器
    open: true,
    proxy:'https://www.escook.cn'
  }
})
