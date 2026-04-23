module.exports = {
  ...require('./coverage'),
  exclude: require('./excludeFiles'),
  'report-dir': './.coverage/combined-report',
  'temp-directory': './.coverage/temp'
}
