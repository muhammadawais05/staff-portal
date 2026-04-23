module.exports = {
  ...require('./coverage'),
  exclude: require('./excludeFiles'),
  'report-dir': './.coverage/combined-report',
  reporter: ['lcov', 'json-summary', 'text-summary', 'clover'],
  'temp-directory': './.coverage/temp'
}
