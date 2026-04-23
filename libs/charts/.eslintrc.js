const {
  getFilteredNoRestrictedImportsPaths
} = require('../../eslint-common-rules')

module.exports = {
  rules: {
    'no-restricted-imports': [
      'warn',
      {
        paths: getFilteredNoRestrictedImportsPaths([
          '@topkit/analytics-charts',
          '@toptal/picasso-charts'
        ])
      }
    ]
  }
}
