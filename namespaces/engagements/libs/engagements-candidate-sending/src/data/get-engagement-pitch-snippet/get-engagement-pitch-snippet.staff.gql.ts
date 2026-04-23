import { gql } from '@staff-portal/data-layer-service'

import { ENGAGEMENT_PITCH_SNIPPET_FRAGMENT } from '../engagement-pitch-snippet-fragment'

export default gql`
  query GetEngagementPitchSnippet($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        id
        ...EngagementPitchSnippetFragment
      }
    }
  }

  ${ENGAGEMENT_PITCH_SNIPPET_FRAGMENT}
`
