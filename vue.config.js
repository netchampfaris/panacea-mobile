module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://panacea:8000',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
