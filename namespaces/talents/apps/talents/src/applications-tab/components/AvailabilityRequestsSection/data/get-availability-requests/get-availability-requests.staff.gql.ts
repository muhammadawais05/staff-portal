import { gql, useQuery, isNetworkLoading, BATCH_KEY } from '@staff-portal/data-layer-service'

import { GetAvailabilityRequestsDocument } from './get-availability-requests.staff.gql.types'
import { APPLICATION_TAB_BATCH_KEY } from '../../../../config'
import { AVAILABILITY_REQUESTS_FRAGMENT } from '../../../../data/availability-requests-fragment'

export const GET_AVAILABILITY_REQUESTS: typeof GetAvailabilityRequestsDocument = gql`
  query GetAvailabilityRequests($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        fullName
        availabilityRequests {
          nodes {
            ...AvailabilityRequestsFragment
          }
        }
      }
    }
  }

  ${AVAILABILITY_REQUESTS_FRAGMENT}
`

export const useGetAvailabilityRequests = (talentId: string) => {
  const { data, loading, networkStatus, ...restOptions } = useQuery(
    GET_AVAILABILITY_REQUESTS,
    {
      variables: { talentId },
      context: { [BATCH_KEY]: APPLICATION_TAB_BATCH_KEY },
      throwOnError: true
    }
  )

  return {
    data: data?.node?.availabilityRequests?.nodes,
    loading,
    networkLoading: isNetworkLoading({ data, loading, networkStatus }),
    ...restOptions
  }
}
