const {
  getFilteredNoRestrictedImportsPaths
} = require('../../eslint-common-rules')

module.exports = {
  rules: {
    'no-restricted-imports': [
      'warn',
      {
        paths: getFilteredNoRestrictedImportsPaths(['@apollo/client', '@graphql-typed-document-node/core'])
      }
    ]
  }
}
