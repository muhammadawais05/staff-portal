/**
 * Partially taken from https://github.com/toptal/talent-portal-frontend/blob/master/scripts/cypressParallelMatrix.js
 */

const {
  CYPRESS_STAFF_PORTAL_CHUNKS_COUNT,
  CYPRESS_BILLING_PACKAGE_CHUNKS_COUNT
} = process.env

const instancesData = {
  'staff-portal': CYPRESS_STAFF_PORTAL_CHUNKS_COUNT,
  'billing-package': CYPRESS_BILLING_PACKAGE_CHUNKS_COUNT
}

for (const key in instancesData) {
  const instancesCount = instancesData[key]

  if (!instancesCount) {
    console.log(`Missing variable with instances count for \`${key}\` instance`)
    process.exit(1)
  }
}

const include = Object.entries(instancesData).reduce(
  (acc, [key, instancesCount]) => {
    Array.from({ length: instancesCount }).forEach((_, index) => {
      acc.push({
        instance: key,
        chunk: index + 1
      })
    })

    return acc
  },
  []
)
const matrix = {
  include
}

console.log(`::set-output name=matrix::${JSON.stringify(matrix)}`)
