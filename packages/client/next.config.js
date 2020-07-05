/* eslint-disable */
// const withLess = require('@zeit/next-less')
// const withCss = require('@zeit/next-css')
// const withSass = require('@zeit/next-sass')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './assets/antd-custom.less'), 'utf8')
)

module.exports = {
  lessLoaderOptions: {
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: themeVariables, // make your antd custom effective
    }
  },
  sassOptions: {
    includePaths: [
      path.resolve(__dirname, 'antd/dist/antd.css'),
      path.resolve(__dirname, './assets/global.scss'),
      path.resolve(__dirname, './components/styles/css/layout.scss'),
      path.resolve(__dirname, './components/kit-core'),
      path.resolve(__dirname, './components/kit-vendors'),
      path.resolve(__dirname, './components/kit-widgets'),
      path.resolve(__dirname, './components/styles'),
    ],
  },
  cssModules: true,
  webpack: (config, { isServer }) => {
    // Make root is default or any node_modules
    config.resolve.modules = [__dirname, 'node_modules'];

    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      })
    }
    return config
  },
}