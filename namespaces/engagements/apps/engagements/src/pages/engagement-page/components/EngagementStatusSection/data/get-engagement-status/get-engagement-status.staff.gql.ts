import { gql, useQuery } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { GetEngagementStatusDocument } from './get-engagement-status.staff.gql.types'

export const GET_ENGAGEMENT_STATUS = gql`
  query GetEngagementStatus($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        ...EngagementStatusFragment
      }
    }
  }

  fragment EngagementStatusFragment on Engagement {
    id
    cumulativeStatus
    status
    talent {
      id
      type
    }
    expiresOn
    proposedEnd {
      id
      endDate
    }
    lastRelevantPerformedAction {
      comment
      performer {
        ...EngagementStatusPerformerFragment
      }
      occurredAt
    }
    postponedPerformedAction {
      comment
      performer {
        ...EngagementStatusPerformerFragment
      }
      occurredAt
    }
    operations {
      proposeEngagementEnd {
        ...OperationFragment
      }
    }
  }

  fragment EngagementStatusPerformerFragment on RoleOrClient {
    ... on Node {
      id
    }
    ... on CompanyRepresentative {
      id
      client {
        id
        fullName
      }
    }
    ... on WebResource {
      webResource {
        text
        url
      }
    }
  }
  ${OPERATION_FRAGMENT}
`

export const useGetEngagementStatus = (engagementId: string) => {
  const { data, ...restOptions } = useQuery(GetEngagementStatusDocument, {
    variables: { engagementId }
  })

  return {
    data: data?.node,
    ...restOptions
  }
}
