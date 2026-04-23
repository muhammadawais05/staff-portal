import { gql } from '@staff-portal/data-layer-service'

export const OPPORTUNITY_JOB_FRAGMENT = gql`
  fragment OpportunityJobFragment on Job {
    id
    title
    status
    talentPortalLink {
      text
      url
    }
    lastAction
    opportunityStagesNames
    committedRevenue
    createdAt
  }
`
