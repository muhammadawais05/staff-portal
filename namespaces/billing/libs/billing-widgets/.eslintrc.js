module.exports = {
  extends: [
    '../../../../node_modules/@toptal/davinci-syntax/src/configs/.eslintrc'
  ],
  overrides: [
    {
      files: ['src/_lib/customHooks/**/*.ts'],
      rules: {
        'max-lines': ['error', 500],
        'max-lines-per-function': ['error', 500],
        'max-statements': ['error', 50]
      }
    },
    {
      files: [
        'src/**/test.ts',
        'src/**/test.tsx',
        'src/**/*.test.ts*',
        'src/**/*.pact.ts',
        'src/_lib/testHelpers/**/*',
        'config/_helper/index.ts',
        'src/**/*.pact.ts'
      ],
      rules: {
        '@miovision/disallow-date/no-new-date': 'off',
        '@miovision/disallow-date/no-static-date': 'off',
        'max-lines': ['error', 2000],
        'max-lines-per-function': ['error', 2000],
        'max-nested-callbacks': ['error', 50],
        'max-statements': ['error', 1000]
      }
    },
    {
      files: ['src/_fixtures/**/*.ts'],
      rules: {
        'max-lines': 'off',
        'max-lines-per-function': ['error', 600]
      }
    },
    {
      extends: ['plugin:i18n-json/recommended'],
      files: ['src/translations/**/*.json'],
      rules: {
        'i18n-json/valid-message-syntax': [
          1,
          {
            syntax: 'non-empty-string'
          }
        ]
      }
    }
  ],
  plugins: ['@miovision/disallow-date'],
  rules: {
    '@miovision/disallow-date/no-new-date': 'error',
    '@miovision/disallow-date/no-static-date': 'error',
    complexity: ['warn', 10],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'no-restricted-globals': 0,
    'no-restricted-properties': 0,
    'todo-plz/ticket-ref': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          // @toptal/picasso-forms
          {
            name: 'final-form',
            message: "Please use '@toptal/picasso-forms' instead."
          },
          {
            name: 'final-form-arrays',
            message: "Please use '@toptal/picasso-forms' instead."
          },
          {
            name: 'react-final-form',
            message: "Please use '@toptal/picasso-forms' instead."
          },
          {
            name: 'react-final-form-arrays',
            message: "Please use '@toptal/picasso-forms' instead."
          },
          {
            name: 'react-final-form-listeners',
            message: "Please use '@toptal/picasso-forms' instead."
          },
          {
            name: 'faker',
            message: 'Please use "faker/locale/en" instead'
          },
          {
            name: '@toptal/picasso',
            importNames: ['Autocomplete'],
            message:
              "Please import 'Autocomplete' from '@staff-portal/ui' instead."
          },
          {
            name: '@toptal/picasso',
            importNames: ['Link'],
            message: "Please import 'Link' from '@topkit/react-router' instead."
          },
          {
            name: '@topkit/router',
            importNames: ['Link'],
            message: "Please import 'Link' from '@topkit/react-router' instead."
          },
          {
            name: 'react-router-dom',
            importNames: ['Link'],
            message: "Please import 'Link' from '@topkit/react-router' instead."
          },
          {
            name: 'react',
            importNames: ['lazy'],
            message: 'Please use @staff-portal/utils instead'
          }
        ]
      }
    ],
    // TODO: enable after https://toptal-core.atlassian.net/browse/FX-2355 is done
    '@toptal/davinci/consistent-data-testid': 'off'
  }
}
