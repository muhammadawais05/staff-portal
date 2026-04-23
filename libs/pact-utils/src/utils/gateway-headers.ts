import { RequestOptions } from '@pact-foundation/pact'

export const gatewayHeaders: RequestOptions = {
  path: '/staff/graphql',
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  }
}
