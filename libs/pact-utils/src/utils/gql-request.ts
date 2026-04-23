import { RequestOptions } from '@pact-foundation/pact'

export const graphQLRequest: RequestOptions = {
  // ToDo: Remove when all test files are migrated
  path: '/api/graphql/staff',
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  }
}
