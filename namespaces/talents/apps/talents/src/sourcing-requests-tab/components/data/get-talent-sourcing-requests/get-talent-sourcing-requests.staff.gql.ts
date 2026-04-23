import {
  gql,
  isNetworkLoading,
  useGetNode
} from '@staff-portal/data-layer-service'

import { GetTalentSourcingRequestsDocument } from './get-talent-sourcing-requests.staff.gql.types'

export const GET_TALENT_SOURCING_REQUESTS = gql`
  query GetTalentSourcingRequests($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        ...TalentSourcingRequestsFragment
        operations {
          linkSourcingRequest {
            callable
            messages
          }
        }
      }
    }
  }

  fragment TalentSourcingRequestsFragment on Talent {
    id
    sourcingRequests {
      nodes {
        ...SourcingRequestFragment
      }
    }
  }

  fragment SourcingRequestFragment on SourcingRequest {
    id
    status
    webResource {
      text
      url
    }
    job {
      id
      client {
        id
        webResource {
          text
          url
        }
      }
    }
  }
`

export const useGetTalentSourcingRequests = (talentId: string) => {
  const { data, loading, networkStatus, ...restOptions } = useGetNode(
    GetTalentSourcingRequestsDocument
  )({ talentId }, { throwOnError: true })

  return {
    data: data?.sourcingRequests?.nodes,
    operations: data?.operations,
    loading,
    networkLoading: isNetworkLoading({ data, loading, networkStatus }),
    ...restOptions
  }
}
