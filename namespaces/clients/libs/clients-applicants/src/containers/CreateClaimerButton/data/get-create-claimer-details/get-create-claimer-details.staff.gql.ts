import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetCreateClaimerDetailsDocument } from './get-create-claimer-details.staff.gql.types'

export default gql`
  query GetCreateClaimerDetails($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        fullName
        contact {
          id
        }
        obscureLead
        pendingCallbackRequest {
          id
          type
          requestedStartTime
          inWorkingHours
          overlappingMeetings {
            nodes {
              name
              scheduledAt
            }
          }
        }
      }
    }
  }
`

export const useGetCreateClaimerDetails = (clientId: string) => {
  const { data, ...restOptions } = useQuery(GetCreateClaimerDetailsDocument, {
    throwOnError: true,
    variables: { clientId }
  })

  return {
    company: data?.node,
    ...restOptions
  }
}
