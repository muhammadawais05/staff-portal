import { gql, useQuery } from '@staff-portal/data-layer-service'

import {
  GetPossibleSchedulersDocument,
  GetPossibleSchedulersQueryVariables
} from './get-possible-organizers.staff.gql.types'
import { SCHEDULER_FOR_TRANSFER_FRAGMENT } from '../../../../data/scheduler-for-transfer-fragment'

export default gql`
  query GetPossibleSchedulers($meetingId: ID!) {
    node(id: $meetingId) {
      ... on Meeting {
        id
        masterBookingPage {
          id
        }
        possibleSchedulersForTransfer {
          nodes {
            ...SchedulerForTransferFragment
          }
        }
      }
    }
  }

  ${SCHEDULER_FOR_TRANSFER_FRAGMENT}
`

export const useGetPossibleSchedulers = (
  variables: GetPossibleSchedulersQueryVariables
) => {
  const { data, ...restOptions } = useQuery(GetPossibleSchedulersDocument, {
    variables,
    fetchPolicy: 'cache-first'
  })

  return {
    data: data?.node
      ? {
          showPossibleSchedulersAutocomplete: !data.node.masterBookingPage,
          possibleSchedulers:
            data.node.possibleSchedulersForTransfer?.nodes || []
        }
      : undefined,
    ...restOptions
  }
}
