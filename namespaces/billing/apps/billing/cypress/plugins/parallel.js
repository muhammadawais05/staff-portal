// eslint-disable-next-line import/no-extraneous-dependencies
const glob = require('glob')

/**
 * TODO: should be unified in https://toptal-core.atlassian.net/browse/SP-1711
 *
 * A cypress plugin running only a subset of tests.
 * It takes all the interaction files and splits into equal chunks.
 *
 * Taken from https://github.com/toptal/talent-portal-frontend/blob/master/hosts/talent-portal/cypress/plugins/parallel.js
 *
 * You can start multiple processes executing a subset of test files like
 *  CYPRESS_BILLING_PACKAGE_CHUNKS_COUNT=3 CYPRESS_CHUNK_ID=1 cypress run ...
 *  CYPRESS_BILLING_PACKAGE_CHUNKS_COUNT=3 CYPRESS_CHUNK_ID=2 cypress run ...
 *  CYPRESS_BILLING_PACKAGE_CHUNKS_COUNT=3 CYPRESS_CHUNK_ID=3 cypress run ...
 */
module.exports = (on, config) => {
  config.env.chunkId = parseInt(process.env.CYPRESS_CHUNK_ID || '1', 10)
  config.env.chunksCount = parseInt(
    process.env.CYPRESS_BILLING_PACKAGE_CHUNKS_COUNT || '1',
    10
  )

  if (config.env.chunksCount <= 1) {
    return
  }

  const chunkId = config.env.chunkId
  const instanceChunksCount = config.env.chunksCount

  // Skip the "partials" folder to avoid infinite specs path
  const files = glob
    .sync('**/integration/**/**spec.ts')
    .map(fileName => fileName.replace('cypress/integration/', ''))

  if (files.length < instanceChunksCount) {
    // eslint-disable-next-line no-console
    console.log(`Less files that total chunks count: ${instanceChunksCount}`)
    process.exit(1)
  }

  const groupFiles = files.filter(
    (_, index) => index % instanceChunksCount === chunkId - 1
  )

  config.testFiles = groupFiles
}
