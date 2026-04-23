const {
  getFilteredNoRestrictedImportsPaths
} = require('../../../../eslint-common-rules')

module.exports = {
  rules: {
    'no-restricted-imports': [
      'warn',
      {
        patterns: [
          { group: ['**/app', '!**/modules/core', '*/config'] },
          {
            group: ['@sentry', 'logrocket'],
            message: 'Please use "@staff-portal/monitoring-service" instead'
          }
        ],
        paths: getFilteredNoRestrictedImportsPaths()
      }
    ]
  }
}
