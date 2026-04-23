import { gql } from '@staff-portal/data-layer-service'

export const OPPORTUNITY_TIMELINE_FRAGMENT = gql`
  fragment OpportunityTimelineFragment on Opportunity {
    id
    enterprise
    estimatedStartWorkDate
    estimatedEndWorkDate
    estimatedCloseDate
    actualStartWorkDate
    actualEndWorkDate
    actualCloseDate
  }
`
