module.exports = {
  env: {
    cypress: {
      plugins: ['istanbul']
    },
    development: {
      plugins: ['@babel/plugin-transform-react-display-name']
    },
    production: {
      plugins: [
        '@babel/plugin-transform-react-jsx',
        '@babel/plugin-transform-react-constant-elements',
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-async-to-generator',
        'transform-inline-environment-variables'
      ],
      presets: [
        [
          '@babel/preset-env',
          {
            corejs: 2,
            useBuiltIns: 'entry'
          }
        ]
      ]
    },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            corejs: 3,
            useBuiltIns: 'usage'
          }
        ]
      ]
    }
  },
  plugins: [
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator'
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 2,
        targets: {
          node: 'current'
        },
        useBuiltIns: 'entry'
      }
    ],
    [
      '@babel/preset-react',
      {
        development: process.env === 'development' || process.env === 'test'
      }
    ],
    '@babel/typescript'
  ]
}
