module.exports = {
  overwrite: true,
  config: {
    scalars: {
      AccessLevelFilter: "'MyBilling' | 'TeamBilling'",
      BigDecimal: 'string',
      Date: "`${`${number}-${number}-${number}`}` | ''",
      GID: 'string',
      ISO8601DateTime:
        '`${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}`',
      JSON: '{ [key: string]: any }',
      PurchaseOrderTypeFilter: "'expirable' | 'withAmount'",
      SearchableNoneMeId: "Scalars['ID'] | 'NONE' | 'ME'",
      Time: "`${`${number}-${number}-${number}T${number}:${number}:${number}${string}`}` | ''",
      Upload: 'any'
    },
    dedupeOperationSuffix: true,
    namingConvention: {
      enumValues: 'keep'
    },
    preResolveTypes: true,
    skipTypename: true,
    content: `/* eslint-disable */
// ⚠️⚠️⚠️⚠️⚠️
// This file was automatically generated and should not be edited.
// ⚠️⚠️⚠️⚠️⚠️

import { disableFragmentWarnings } from 'graphql-tag';
disableFragmentWarnings();
`
  },
  generates: {
    'lens/index.ts': {
      schema: [
        '../../tmp-graphql/lens_schema.graphql',
        './extensions_lens.graphql'
      ],
      config: {
        scalars: {
          DateTime: 'string',
          Address: 'string',
          PageSize: 'number'
        },
        resolverTypeWrapperSignature: 'Promise<Partial<T>> | Partial<T>',
        allowParentTypeOverride: false,
        noSchemaStitching: true,
        optionalInfoArgument: true,
        optionalResolveType: true
      },
      plugins: ['add', 'typescript', 'typescript-resolvers']
    },
    'staff/index.ts': {
      schema: [
        '../../tmp-graphql/gateway_schema.graphql',
        './extensions_staff.graphql'
      ],
      config: {
        resolverTypeWrapperSignature: 'Promise<Partial<T>> | Partial<T>',
        allowParentTypeOverride: false,
        noSchemaStitching: true,
        optionalInfoArgument: true,
        optionalResolveType: true
      },
      plugins: ['add', 'typescript', 'typescript-resolvers']
    },
    'introspection-query-result.json': {
      schema: [
        '../../tmp-graphql/lens_schema.graphql',
        './extensions_lens.graphql',
        '../../tmp-graphql/gateway_schema.graphql',
        './extensions_staff.graphql',
        'chronicles/schema.graphql'
      ],
      plugins: ['fragment-matcher']
    }
  }
}
