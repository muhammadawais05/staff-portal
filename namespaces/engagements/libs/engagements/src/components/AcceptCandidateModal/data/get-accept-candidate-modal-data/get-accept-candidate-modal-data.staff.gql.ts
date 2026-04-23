import { gql } from '@staff-portal/data-layer-service'
import { TIME_ZONE_FRAGMENT } from '@staff-portal/date-time-utils'

export default gql`
  query GetAcceptCandidateModalData($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        ...AcceptCandidateModalFragment
      }
    }
  }

  fragment AcceptCandidateModalFragment on Engagement {
    id
    job {
      id
    }
    client {
      id
      timeZone {
        ...TimeZoneFragment
      }
      hasUnpaidDepositInvoices
    }
    talent {
      id
      timeZone {
        name
      }
    }
  }
  ${TIME_ZONE_FRAGMENT}
`
