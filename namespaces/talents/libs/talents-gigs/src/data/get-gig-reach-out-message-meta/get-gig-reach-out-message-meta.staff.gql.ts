import { gql, useQuery } from '@staff-portal/data-layer-service'

import {
  GigReachOutMessageMetaFragment,
  GetGigReachOutMessageMetaQuery,
  GetGigReachOutMessageMetaQueryVariables,
  GetGigReachOutMessageMetaDocument
} from './get-gig-reach-out-message-meta.staff.gql.types'

export default gql`
  query GetGigReachOutMessageMeta($candidateId: ID!, $gigId: ID!) {
    getGigReachOutMessageMeta(candidateId: $candidateId, gigId: $gigId) {
      ...GigReachOutMessageMetaFragment
    }
  }

  fragment GigReachOutMessageMetaFragment on GigReachOutMessageMeta {
    ... on GigReachOutMessageMeta {
      footer
      header
      messageBody
    }
  }
`

export const useGetGigReachOutMessageMeta = (
  variables: GetGigReachOutMessageMetaQueryVariables,
  options?: {
    skip?: boolean
    onCompleted: (data: GetGigReachOutMessageMetaQuery) => void
  }
) => {
  const { data, error, loading, ...restOptions } = useQuery<{
    getGigReachOutMessageMeta: GigReachOutMessageMetaFragment
  }>(GetGigReachOutMessageMetaDocument, {
    variables,
    notifyOnNetworkStatusChange: true,
    ...options
  })

  const gigReachOutMessageMeta = data?.getGigReachOutMessageMeta

  return {
    gigReachOutMessageMeta,
    error,
    loading,
    ...restOptions
  }
}
