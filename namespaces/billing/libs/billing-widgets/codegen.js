const baseConfig = require('@staff-portal/graphql/codegen.js')

module.exports = {
  config: baseConfig.config,
  generates: {
    'src/modules/': {
      schema: [
        '../../../../tmp-graphql/gateway_schema.graphql',
        require.resolve('@staff-portal/graphql/extensions_staff.graphql')
      ],
      preset: 'near-operation-file',
      documents: [
        '../billing/src/**/*.graphql.ts',
        'src/components/**/*.graphql.ts',
        'src/containers/**/*.graphql.ts',
        'src/modules/**/*.graphql.ts'
      ],
      config: {
        defaultBaseOptions: {
          throwOnError: true
        },
        apolloReactHooksImportFrom:
          '@staff-portal/data-layer-service/src/hooks',
        onlyOperationTypes: true,
        apolloClientVersion: 3
      },
      presetConfig: {
        baseTypesPath: '~@staff-portal/graphql/staff',
        extension: '.types.tsx'
      },
      plugins: ['add', 'typescript-operations', 'typescript-react-apollo']
    }
  }
}
