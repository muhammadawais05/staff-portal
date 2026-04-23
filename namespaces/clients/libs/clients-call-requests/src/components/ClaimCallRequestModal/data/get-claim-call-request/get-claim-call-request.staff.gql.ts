import { gql, useGetNode } from '@staff-portal/data-layer-service'

import { GetClaimCallRequestDocument } from './get-claim-call-request.staff.gql.types'

export default gql`
  query GetClaimCallRequest($callRequestId: ID!) {
    node(id: $callRequestId) {
      ...GetClaimCallRequestFragment
    }
  }

  fragment GetClaimCallRequestFragment on CallbackRequest {
    id
    name
    type
    inWorkingHours
    requestedStartTime
    overlappingMeetings {
      nodes {
        name
        scheduledAt
        __typename
      }
      __typename
    }
    operations {
      claimCallbackRequestWithClient {
        callable
        messages
        __typename
      }
      __typename
    }
  }
`

export const useGetClaimCallRequest = (callRequestId: string) =>
  useGetNode(GetClaimCallRequestDocument)(
    { callRequestId },
    { fetchPolicy: 'cache-first' }
  )
