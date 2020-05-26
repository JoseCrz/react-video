require('ignore-styles')

// ? For async - await
require('@babel/polyfill')

require('@babel/register')({
  presets: [
    '@babel/preset-env',
    '@babel/preset-react'
  ]
})

// ! MAKE SURE TO BE USING file-loader 5.1.0, otherwise it won't work
require('asset-require-hook')({
  extensions: ['jpg', 'png', 'svg', 'gif'],
  name: '/assets/[hash].[ext]',
})

// require('asset-require-hook')({
//   extensions: ['jpg', 'png', 'gif'],
//   name: '/assets/[hash].[ext]',
// })

require('./server')