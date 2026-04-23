// temporary workaround until line 15 lands in Davinci
// Solves the error in tests for components that use `forwardedAs`:
// `Warning: React does not recognize the `forwardedAs` prop on a DOM element...`
const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ],
  plugins: ['babel-plugin-styled-components']
}

// eslint-disable-next-line import/no-extraneous-dependencies
module.exports = require('babel-jest').default.createTransformer(babelOptions)
