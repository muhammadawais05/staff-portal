const path = require('path')
const webpack = require('webpack')

const resolveApp = relativePath => path.resolve('./', relativePath)

module.exports = {
  stories: ['../src/**/__stories__/*.stories.(ts|tsx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs'
  ],
  webpackFinal: async config => {
    /**
     * Drop babel-loader for `.js|.md` pattern.
     *
     * It turned out that storybook had a conflict in the babel-loader configuration
     * preset-env didn't set a value of `loose` property for one of plugins,
     * it led to an internal babel error about mismatched `loose` value for another plugin
     *
     * Current solution is to drop babel-loader for .js|.md since we write our stories in TS.
     * If you revert it back, make sure this bug is fixed (introduced in babel 7.10.2)
     *
     * Reference https://github.com/babel/babel/issues/11622
     */
    config.module.rules.shift()

    // Fix for:
    // Error: Can't resolve 'fs' in 'staff-portal/node_modules/node-email-reply-parser'
    config.node = { fs: 'empty' }

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
        plugins: [require.resolve('babel-plugin-styled-components')]
      }
    })

    config.resolve.extensions.push('.ts', '.tsx')

    config.resolve.alias = {
      '~': resolveApp('src'),
      '@src': resolveApp('src'),
      '@modules': resolveApp('src/modules'),
      '@toptal/staff-portal': resolveApp('src/index.package')
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.IS_BUNDLED_AS_LIBRARY': true
      })
    )

    return config
  }
}
