// eslint-disable-next-line import/no-extraneous-dependencies
const { getWorkspaceRoot } = require('@toptal/davinci-engine/src/utils')
const path = require('path')

const baseConfig = require('./codegen.js')
const relativePathToRoot = path.relative(process.cwd(), getWorkspaceRoot())

module.exports = {
  config: baseConfig.config,
  generates: {
    'src/lens': {
      schema: [
        `${relativePathToRoot}/tmp-graphql/lens_schema.graphql`,
        './extensions_lens.graphql'
      ],
      preset: 'near-operation-file',
      documents: [
        'src/**/*.lens.gql.ts',
        `${relativePathToRoot}/libs/**/*-fragment.lens.gql.ts`,
        `${relativePathToRoot}/namespaces/**/libs/**/*-fragment.lens.gql.ts`
      ],
      config: {
        documentMode: 'graphQLTag',
        dedupeFragments: true
      },
      presetConfig: {
        baseTypesPath: '~@staff-portal/graphql/lens',
        extension: '.types.tsx'
      },
      plugins: ['add', 'typescript-operations', 'typed-document-node']
    }
  }
}
