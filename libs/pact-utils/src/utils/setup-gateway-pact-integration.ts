import { ApolloClient, createHttpLink } from '@staff-portal/data-layer-service'
import fetch, { Headers } from 'node-fetch'

import { createGQLGatewayGraphQLProvider } from './create-gql-gateway-gql-provider'
import { getApolloClientCache } from './get-apollo-client-cache'

declare let global: {
  Headers: unknown
  fetch: unknown
}

export const setupGatewayPactIntegration = () => {
  global.Headers = Headers
  global.fetch = fetch

  const provider = createGQLGatewayGraphQLProvider({ port: 5021 })
  const client = new ApolloClient({
    link: createHttpLink({
      uri: 'http://localhost:5021/staff/graphql',
      credentials: 'include'
    }),
    cache: getApolloClientCache(),
    resolvers: {}
  })

  beforeAll(() => provider.setup())
  afterAll(() => provider.finalize())
  // verify with Pact, and reset expectations
  afterEach(async () => {
    await provider.verify()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await client.cache.data.clear()
  })

  return { provider, client }
}
