const {
  getFilteredNoRestrictedImportsPaths,
  deprecatedProps
} = require('./eslint-common-rules')

module.exports = {
  extends: ['./node_modules/@toptal/davinci-syntax/src/configs/.eslintrc'],
  plugins: ['@miovision/disallow-date', 'filename-rules'],
  ignorePatterns: ['/__mocks__', 'dist', 'jest-html-reporters-attach'],
  rules: {
    // FIXME: errors should be fixed and rules should be removed
    'no-case-declarations': 'warn',
    'max-lines': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    'func-call-spacing': 'off', // this rule has poor support for typescript generics syntax
    '@typescript-eslint/func-call-spacing': 'error',
    'no-console': 'error',
    'todo-plz/ticket-ref': 'off',
    'no-restricted-globals': [
      'error',
      {
        name: 'analytics',
        message:
          'Please specify analytics-related logic inside "@staff-portal/monitoring-service"'
      },
      {
        name: 'URL',
        message: 'Please use helpers from "@staff-portal/navigation" instead'
      },
      {
        name: 'URLSearchParams',
        message: 'Please use helpers from "@staff-portal/navigation" instead'
      }
    ],
    'no-restricted-properties': [
      'error',
      {
        object: 'window',
        property: 'analytics',
        message:
          'Please specify analytics-related logic inside "@staff-portal/monitoring-service"'
      },
      {
        object: 'window',
        property: 'location',
        message: 'Please use helpers from "@staff-portal/navigation" instead'
      }
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.object.name='localStorage']",
        message: 'Please use "@staff-portal/local-storage-service" instead'
      }
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: [
          {
            group: [
              '!@apollo/client/**',
              '!@toptal/billing-frontend/src/widget/**',
              '**/hosts'
            ]
          },
          {
            group: ['@sentry', 'logrocket'],
            message: 'Please use "@staff-portal/monitoring-service" instead'
          },
          {
            group: ['@staff-portal/*/src/**', '!@staff-portal/*/src/mocks'],
            message: `Please don't use deep imports.`
          }
        ],
        paths: getFilteredNoRestrictedImportsPaths()
      }
    ],
    // TODO: enable after https://toptal-core.atlassian.net/browse/FX-2355 is done
    '@toptal/davinci/consistent-data-testid': 'off',
    '@toptal/davinci/no-mock-export-from-index': [
      'error',
      {
        excludedPaths: ['/cypress'],
        excludedNames: [
          'MockedProvider',
          'MockedResponse',
          'MockedProviderProps',
          'TestWrapperWithMocks',
          'createMutationMocks',
          'create-mutation-mocks'
        ]
      }
    ],
    '@toptal/davinci/no-restricted-imports-monorepo': [
      'error',
      [
        // lib can't depend on app
        {
          from: 'libs/**',
          to: 'namespaces/*/apps/**'
        },
        {
          from: 'apps/**',
          to: 'apps/**',
          except: ['apps/app/**']
        },
        {
          from: 'namespaces/*/libs/**',
          to: 'namespaces/*/apps/**'
        },
        // root-level lib can't depend on lib from the namespace
        {
          from: 'libs/**',
          to: 'namespaces/*/libs/**'
        },
        // app can't depend on app
        {
          from: 'namespaces/*/apps/**',
          to: 'namespaces/*/apps/**'
        },
        // host can't be imported anywhere
        {
          from: '!hosts/**',
          to: 'hosts/**'
        },
        // namespaces/facilities/libs may depends only on namespaces/facilities/libs/ or libs/
        {
          from: 'namespaces/facilities/libs/**',
          to: 'namespaces/!(facilities)/libs/**'
        }
      ]
    ],
    '@toptal/davinci/no-deprecated-props': ['error', deprecatedProps]
  },
  overrides: [
    {
      files: ['**/*.gql.ts'],
      rules: {
        // enforces the use of kebab-case for .gql files
        'filename-rules/match': [2, /^([a-z0-9]+-)*[a-z0-9]+(?:\..*)?$/]
      }
    },
    {
      files: ['**/*.ts*'],
      rules: {
        '@miovision/disallow-date/no-new-date': 'warn',
        '@miovision/disallow-date/no-static-date': 'warn'
      },
      excludedFiles: [
        '**/test.*',
        '**/*.test.*',
        '**/__mocks__/**',
        '**/__stories__/**',
        '**/mocks.*'
      ]
    },
    {
      files: ['**/test.*', '**/*.test.*', '**/*.pact.*'],
      rules: {
        'jest/expect-expect': [
          'warn',
          {
            assertFunctionNames: ['expect', 'assertOnTooltipText']
          }
        ]
      }
    },
    // Aggregated Jest/Pact/Cypress files
    {
      extends: ['plugin:jest/style', 'plugin:jest-formatting/strict'],
      files: [
        '**/test.*',
        '**/*.test.*',
        '**/*.pact.*',
        '**/cypress/integration/**/*',
        '**/cypress/support/mockScalars.ts'
      ],
      rules: {
        'max-lines': ['error', 2000],
        'max-statements': ['error', 1000],
        'max-lines-per-function': ['error', 2000],
        '@typescript-eslint/no-non-null-assertion': 'off'
      }
    },
    {
      files: ['**/*.gql.ts*'],
      rules: {
        'no-restricted-syntax': [
          'error',
          {
            selector:
              'TaggedTemplateExpression[quasi.quasis.0.value.raw=/@rest/]',
            message:
              'Please use *.rest.ts filename pattern for gql files which contains @rest operator'
          }
        ]
      }
    }
  ]
}
