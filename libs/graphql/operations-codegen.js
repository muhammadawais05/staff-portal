// eslint-disable-next-line import/no-extraneous-dependencies
const { getWorkspaceRoot } = require('@toptal/davinci-engine/src/utils')
const path = require('path')

const baseConfig = require('./codegen.js')
const relativePathToRoot = path.relative(process.cwd(), getWorkspaceRoot())

module.exports = {
  config: baseConfig.config,
  generates: {
    'src/modules': {
      schema: [
        `${relativePathToRoot}/tmp-graphql/gateway_schema.graphql`,
        './extensions_staff.graphql'
      ],
      preset: 'near-operation-file',
      documents: [
        'src/**/*.staff.gql.ts',
        `${relativePathToRoot}/libs/**/*-fragment.staff.gql.ts`,
        `${relativePathToRoot}/namespaces/**/libs/**/*-fragment.staff.gql.ts`,
        `${relativePathToRoot}/hosts/staff-portal/src/modules/**/*-fragment.staff.gql.ts`
      ],
      config: {
        documentMode: 'graphQLTag',
        dedupeFragments: true
      },
      presetConfig: {
        baseTypesPath: '~@staff-portal/graphql/staff',
        extension: '.types.tsx'
      },
      plugins: ['add', 'typescript-operations', 'typed-document-node']
    }
  }
}
