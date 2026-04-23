
import { ApolloError, gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'

import {
  GetClaimableClientsDocument,
  GetClaimableClientsQuery,
  GetClaimableClientsQueryVariables
} from './poll-claimable-clients.staff.gql.types'
import { SUMMARY_SIDEBAR_BATCH_KEY } from '../../../../config'

// TODO: replace query when https://toptal-core.atlassian.net/browse/GOLD-163 is resolved
export const POLL_CLAIMABLE_CLIENTS: typeof GetClaimableClientsDocument = gql`
  query GetClaimableClients($pagination: OffsetPagination!) {
    clientApplicants(pagination: $pagination) {
      totalCount
      nodes {
        ...NewLeadFragment
      }
    }
  }

  fragment NewLeadFragment on Client {
    id
    claimableSince
    operations {
      createClientClaimer {
        callable
      }
    }
    __typename
  }
`

// TODO: replace filter when https://toptal-core.atlassian.net/browse/GOLD-163 is resolved
export const POLL_CLAIMABLE_CLIENTS_QUERY_VARIABLES: GetClaimableClientsQueryVariables =
  {
    pagination: {
      offset: 0,
      limit: 10
    }
  }

export const usePollClaimableClients = ({
  onCompleted,
  onError
}: {
  onCompleted: (data: GetClaimableClientsQuery) => void
  onError: (error: ApolloError) => void
}) =>
  useQuery(POLL_CLAIMABLE_CLIENTS, {
    variables: POLL_CLAIMABLE_CLIENTS_QUERY_VARIABLES,
    onCompleted,
    onError,
    context: { [BATCH_KEY]: SUMMARY_SIDEBAR_BATCH_KEY },
    notifyOnNetworkStatusChange: true
  })
