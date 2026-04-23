import { gql, useQuery } from '@staff-portal/data-layer-service'

import {
  GetSchedulerAvailabilityDocument,
  GetSchedulerAvailabilityQueryVariables
} from './get-scheduler-availability.staff.gql.types'

export const GET_SCHEDULER_AVAILABILITY: typeof GetSchedulerAvailabilityDocument = gql`
  query GetSchedulerAvailability(
    $schedulerId: ID!
    $from: Time!
    $till: Time!
  ) {
    node(id: $schedulerId) {
      ... on MeetingScheduler {
        id
        role {
          ... on Role {
            id
            availableForMeeting(from: $from, till: $till)
          }
        }
      }
    }
  }
`

export const useGetSchedulerAvailability = (
  variables: GetSchedulerAvailabilityQueryVariables
) => {
  const { data, ...restOptions } = useQuery(GET_SCHEDULER_AVAILABILITY, {
    throwOnError: true,
    variables,
    fetchPolicy: 'cache-first'
  })

  return {
    availableForMeeting: data?.node?.role.availableForMeeting,
    ...restOptions
  }
}
