import { gql } from '@staff-portal/data-layer-service'
import { WEB_RESOURCE_FRAGMENT } from '@staff-portal/facilities'

export default gql`
  query GetCandidateSendingEngagement($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        status
        talent {
          id
          type
          ...WebResourceFragment
        }
        job {
          id
          ...WebResourceFragment
        }
        webResource {
          url
        }
      }
    }
  }

  ${WEB_RESOURCE_FRAGMENT}
`
