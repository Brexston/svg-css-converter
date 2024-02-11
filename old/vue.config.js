module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/assets/sass/base/_utils.sass"`,
      }
    }
  },
  configureWebpack: {
    devtool: "source-map",
  },
  publicPath: './',
  outputDir: "./docs",
}