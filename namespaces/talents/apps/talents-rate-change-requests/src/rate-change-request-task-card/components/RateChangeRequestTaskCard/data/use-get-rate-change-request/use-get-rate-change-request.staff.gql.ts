import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'
import { FIRST_TASK_CARD_BATCH_KEY } from '@staff-portal/tasks'

import { RATE_CHANGE_REQUEST_FRAGMENT } from '../../../../../data'
import { GetRateChangeRequestDocument } from './use-get-rate-change-request.staff.gql.types'

export const GET_RATE_CHANGE_REQUEST: typeof GetRateChangeRequestDocument = gql`
  query GetRateChangeRequest($rateChangeRequestId: ID!) {
    node(id: $rateChangeRequestId) {
      ... on RateChangeRequest {
        ...RateChangeRequestFragment
      }
    }
  }

  ${RATE_CHANGE_REQUEST_FRAGMENT}
`

export const useGetRateChangeRequest = (rateChangeRequestId: string) => {
  const { data, ...restOptions } = useQuery(GET_RATE_CHANGE_REQUEST, {
    throwOnError: true,
    variables: { rateChangeRequestId },
    context: { [BATCH_KEY]: FIRST_TASK_CARD_BATCH_KEY }
  })

  return {
    data: data?.node,
    ...restOptions
  }
}
