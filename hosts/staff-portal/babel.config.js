module.exports = {
  env: {
    test: {
      plugins: process.env.CYPRESS_COVERAGE === 'true' ? ['istanbul'] : []
    }
  }
}
