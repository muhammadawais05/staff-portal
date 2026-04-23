import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetTalentAvailabilityRequestDocument } from './get-talent-request-availability.staff.gql.types'

export const GET_TALENT_AVAILABILITY_REQUEST = gql`
  query GetTalentAvailabilityRequest($talentId: ID!, $clientId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        type
        jobAvailabilityRequests(
          filter: { clientId: $clientId, jobStatus: PENDING_ENGINEER }
        ) {
          edges {
            ...JobAvailabilityRequestEdgeFragment
          }
        }
      }
    }
  }

  fragment JobAvailabilityRequestEdgeFragment on JobAvailabilityRequestEdge {
    job {
      id
      title
    }
    restrictionWarning
    availabilityRequest {
      id
    }
  }
`

export const useGetTalentAvailabilityRequest = ({
  talentId,
  clientId
}: {
  talentId: string
  clientId: string
}) =>
  useQuery(GetTalentAvailabilityRequestDocument, {
    variables: {
      talentId,
      clientId
    },
    skip: !clientId
  })
