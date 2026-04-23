const staffOperations = require('@staff-portal/graphql/operations-codegen.js')
const lensOperations = require('@staff-portal/graphql/lens-operations-codegen.js')

module.exports = {
  ...staffOperations,
  generates: {
    ...staffOperations.generates,
    ...lensOperations.generates
  }
}
