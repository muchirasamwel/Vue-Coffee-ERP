module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: 'http://141.125.65.199:2000',
          changeOrigin: true
        },
      }
    }
  }

