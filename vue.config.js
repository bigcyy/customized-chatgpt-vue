const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api':{
        //websocket
        ws:false,
        //目标地址
        target:'http://localhost:8081',
        //发送请求头host会被设置为target
        changeOrigin: true,
        //重写请求路径
        pathRewrite:{
          '^/api':''
        }
      }
    }
  }
})
