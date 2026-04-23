const {
  getFilteredNoRestrictedImportsPaths
} = require('../../eslint-common-rules')

module.exports = {
  rules: {
    '@miovision/disallow-date/no-new-date': 0,
    'no-restricted-imports': [
      'error',
      {
        paths: getFilteredNoRestrictedImportsPaths([
          'date-fns',
          'date-fns/locale',
          'date-fns-tz'
        ])
      }
    ]
  }
}
