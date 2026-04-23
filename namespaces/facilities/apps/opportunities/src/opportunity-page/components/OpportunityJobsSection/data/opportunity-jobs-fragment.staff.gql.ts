import { gql } from '@staff-portal/data-layer-service'

import { OPPORTUNITY_JOB_FRAGMENT } from '.'

export const OPPORTUNITY_JOBS_FRAGMENT = gql`
  fragment OpportunityJobsFragment on Opportunity {
    id
    name
    type
    jobs {
      nodes {
        ...OpportunityJobFragment
      }
    }
  }

  ${OPPORTUNITY_JOB_FRAGMENT}
`
