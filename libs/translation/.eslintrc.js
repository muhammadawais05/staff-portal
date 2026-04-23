const {
  getFilteredNoRestrictedImportsPaths
} = require('../../eslint-common-rules')

module.exports = {
  rules: {
    'no-restricted-imports': [
      'warn',
      {
        paths: getFilteredNoRestrictedImportsPaths(['i18next', 'react-i18next'])
      }
    ]
  }
}
