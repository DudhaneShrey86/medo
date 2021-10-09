module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
        @import "@/assets/css/_variables.scss";
        @import "@/assets/css/_mixins.scss";
        @import "@/assets/css/_extends.scss";
        `,
      },
    },
  },
  devServer: {
    proxy: {
      '/server': {
        // target: 'http://localhost:8080', // provide proxy  for your project
        target: 'https://cs.mkcl.org/1tnTkU5kI7a4Kun9JlxkhUc1TDO', // provide proxy  for your project
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/server': ''
        }
      },
      '/cdnserver': {
        target: 'http://localhost:3034/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/cdnserver': ''
        }
      }
    }
  },
  productionSourceMap: false
};