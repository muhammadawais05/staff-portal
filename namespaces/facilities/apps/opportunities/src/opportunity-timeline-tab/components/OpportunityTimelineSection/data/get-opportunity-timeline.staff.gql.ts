import { gql } from '@staff-portal/data-layer-service'

import { OPPORTUNITY_TIMELINE_FRAGMENT } from './opportunity-timeline-fragment.staff.gql'

export default gql`
  query GetOpportunityTimeline($opportunityId: ID!) {
    node(id: $opportunityId) {
      ... on Opportunity {
        ...OpportunityTimelineFragment
      }
    }
  }

  ${OPPORTUNITY_TIMELINE_FRAGMENT}
`
