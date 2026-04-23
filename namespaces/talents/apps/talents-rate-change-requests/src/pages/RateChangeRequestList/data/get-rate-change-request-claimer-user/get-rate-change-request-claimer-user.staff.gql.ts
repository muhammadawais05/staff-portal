import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetRateChangeRequestClaimerUserDocument } from './get-rate-change-request-claimer-user.staff.gql.types'
import { RATE_CHANGE_REQUEST_CLAIMER_FRAGMENT } from '../rate-change-request-claimer-fragment'

export const GET_RATE_CHANGE_REQUEST_CLAIMER_USER: typeof GetRateChangeRequestClaimerUserDocument = gql`
  query GetRateChangeRequestClaimerUser($staffId: ID!) {
    node(id: $staffId) {
      ...RateChangeRequestClaimerFragment
    }
  }

  ${RATE_CHANGE_REQUEST_CLAIMER_FRAGMENT}
`

export const useGetRateChangeRequestClaimerUser = ({
  staffId,
  skip
}: {
  staffId: string
  skip?: boolean
}) => {
  const { data, loading } = useQuery(GET_RATE_CHANGE_REQUEST_CLAIMER_USER, {
    variables: { staffId },
    fetchPolicy: 'cache-first',
    skip
  })

  return {
    data: data?.node,
    loading
  }
}
