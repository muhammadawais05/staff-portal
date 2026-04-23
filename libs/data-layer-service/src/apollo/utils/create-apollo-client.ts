import { ErrorHandler, onError } from '@apollo/client/link/error'
import {
  TopkitApolloClient,
  TopkitApolloClientOptions
} from '@topkit/apollo-client'
import { Utilities } from '@topkit/apollo-client/links'
import { ApolloLink } from '@apollo/client'

import { createApolloClientCache } from './create-apollo-client-cache'
import { createApolloClientResolvers } from './create-apollo-client-resolvers'
import { getEndpointName } from './get-endpoint-name'
import { createCustomFetch, createEmptyDataLink } from './links'

export interface CreateApolloClientSettings {
  config: ApolloClientConfiguration
  endpoints: ApolloClientSchemaUrls
}

interface ApolloClientSchemaUrls {
  kipperUrl?: string
  platformUrl: string
}

interface ApolloClientConfiguration {
  connectToDevTools?: boolean
  defaultEndpointName?: TopkitApolloClientOptions['defaultEndpointName']
  errorHandlers?: ErrorHandler[]
  isEnd2EndTestMode?: boolean
  isIntegrationTestMode?: boolean
  isDevelopmentMode?: boolean
}

export const createApolloClient = ({
  config: {
    connectToDevTools,
    isEnd2EndTestMode,
    isIntegrationTestMode,
    defaultEndpointName = 'Gateway',
    errorHandlers,
    isDevelopmentMode
  },
  endpoints: { platformUrl }
}: CreateApolloClientSettings) => {
  const chroniclesUri = `${platformUrl}/gateway/chronicles/graphql`
  const lensSchemaUri = `${platformUrl}/gateway/lens/graphql`
  const platformUri = `${platformUrl}/api/graphql/platform`
  const staffSchemaUri = `${platformUrl}/gateway/graphql/staff/graphql`
  const isCustomFetchEnabled = connectToDevTools && !isIntegrationTestMode
  const isPersistedQueriesEnabled = !(
    isEnd2EndTestMode ||
    isIntegrationTestMode ||
    isDevelopmentMode
  )
  const emptyDataHandler = createEmptyDataLink()

  const Error = errorHandlers?.length
    ? ApolloLink.from([
        ApolloLink.from(errorHandlers.map(onError)),
        emptyDataHandler
      ])
    : ApolloLink.from([emptyDataHandler])
  const utilities: Partial<Utilities> = {
    Error,
    FetchMonitor: { enabled: false }
  }

  if (isEnd2EndTestMode) {
    utilities.Batch = { enabled: false }
    utilities.FetchMonitor = { enabled: true }
  }

  if (isIntegrationTestMode) {
    utilities.Batch = {
      batchMax: 1
    }
  }

  return new TopkitApolloClient({
    endpoints: {
      Gateway: {
        uri: staffSchemaUri,
        persistedQueries: isPersistedQueriesEnabled
      },
      Lens: {
        uri: lensSchemaUri
      },
      Chronicles: {
        uri: chroniclesUri
      },
      Platform: {
        uri: platformUri
      },
      /** These two below must be empty string because the chart path where the Kipper / Analytics API is used includes the full path.
       * E.g. claimingDurationKpiChartDataUrl from the get-company-applicants.staff.gql.ts query */
      Kipper: { uri: '' },
      Analytics: { uri: '' }
    },
    utilities,
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-first'
      },
      query: { errorPolicy: 'all', fetchPolicy: 'network-only' },
      mutate: { errorPolicy: 'all' }
    },
    cache: createApolloClientCache(),
    resolvers: createApolloClientResolvers(),
    fetch: createCustomFetch(isCustomFetchEnabled),
    defaultEndpointName,
    getEndpointName,
    connectToDevTools
  })
}
