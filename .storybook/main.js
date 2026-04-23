const fs = require('fs')
const path = require('path')
const { DefinePlugin } = require('webpack')
const {
  getEnvVariables
} = require('@toptal/davinci-engine/src/utils/get-env-variables')
const { getWorkspaceRoot } = require('@toptal/davinci-engine/src/utils')

const dotenv = `${getWorkspaceRoot()}/hosts/staff-portal/.env.${
  process.env.NODE_ENV
}`
const env = getEnvVariables({ dotenv })

const stringifiedEnv = {}

for (const key in env) {
  stringifiedEnv[key] = JSON.stringify(env[key])
}

const STORY_EXTENSIONS = ['mdx', 'tsx', 'md', 'jsx']
const STORY_EXTENSIONS_PATTERN = `(${STORY_EXTENSIONS.join('|')})`

let currentWorkspace = process.cwd()

let isRootWorkspace = __dirname === `${currentWorkspace}/.storybook`

const lastArg = process.argv[process.argv.length - 1]

const tryingSingleStory = STORY_EXTENSIONS.some(ext =>
  lastArg.endsWith(`.${ext}`)
)
const isSingleStory = STORY_EXTENSIONS.some(ext =>
  lastArg.endsWith(`stories.${ext}`)
)

const singleStoryPath = isSingleStory
  ? path.resolve(currentWorkspace, lastArg)
  : undefined

if (tryingSingleStory) {
  if (!isSingleStory) {
    console.error(
      'It seems you\'re trying to run a single story, but not a story file is provided, please specify "*.stories.tsx" or ".stories.mdx" file'
    )
    process.exit(1)
  }

  console.log(`Running single story file: "${lastArg}"`)
}

// try locating provided directory path,
// fallback to default behavior silently if cannot locate the directory
if (!tryingSingleStory && !lastArg.startsWith('.')) {
  const directoryPath = path.resolve(currentWorkspace, lastArg)

  if (
    fs.existsSync(directoryPath) &&
    fs.statSync(directoryPath).isDirectory()
  ) {
    console.log(`Running stories from directory: "${lastArg}"`)
    isRootWorkspace = false
    currentWorkspace = directoryPath
  }
}

const stories = singleStoryPath
  ? [singleStoryPath]
  : isRootWorkspace
  ? [
      `${currentWorkspace}/libs/**/*.stories.@${STORY_EXTENSIONS_PATTERN}`,
      `${currentWorkspace}/namespaces/**/*.stories.@${STORY_EXTENSIONS_PATTERN}`,
      `${currentWorkspace}/hosts/**/*.stories.@${STORY_EXTENSIONS_PATTERN}`
    ]
  : [`${currentWorkspace}/**/*.stories.@${STORY_EXTENSIONS_PATTERN}`]

module.exports = {
  core: {
    builder: 'webpack5'
  },
  stories,
  typescript: {
    // Turning this off for now because it creates OOM error when run from root.
    // Running from package level works fine
    check: false,
    reactDocgen: false
  },
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        transcludeMarkdown: true
      }
    },
    '@storybook/addon-controls',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-toolbars',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-storysource',
    '@storybook/addon-queryparams',
    '@storybook/addon-backgrounds',
    '@storybook/addon-measure',
    '@storybook/addon-outline'
  ],
  webpackFinal: config => {
    config.module.rules.push({
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
      test: /\.(graphql|gql)$/
    })
    config.module.rules.push({
      include: /node_modules/,
      test: /\.mjs$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false
      }
    })

    config.plugins.push(new DefinePlugin({ 'process.env': stringifiedEnv }))
    config.plugins.push(
      new DefinePlugin({
        'process.env.PLATFORM_URL': JSON.stringify(process.env.PLATFORM_URL)
      })
    )
    config.resolve.extensions.push('.gql', '.graphql', '.mjs')

    // error: can't resolve 'fs' in 'staff-portal/node_modules/node-email-reply-parser'
    config.resolve.fallback = {
      fs: false,
      path: 'path-browserify'
    }

    return config
  },
  env: config => ({
    ...config,
    STORYBOOK_GOOGLE_MAPS_API_KEY: env.DAVINCI_GOOGLE_MAPS_API_KEY
  }),
  babel: async options => {
    options.plugins = ['babel-plugin-styled-components', ...options.plugins]

    return options
  }
}
