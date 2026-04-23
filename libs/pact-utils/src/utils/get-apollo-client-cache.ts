import { InMemoryCache } from '@staff-portal/data-layer-service'
import introspectionQueryResultData from '@staff-portal/graphql/introspection-query-result.json'

export const getApolloClientCache = () =>
  new InMemoryCache({
    possibleTypes: introspectionQueryResultData.possibleTypes
  })
