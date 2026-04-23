import { gql } from '@staff-portal/data-layer-service'

export const JOB_STATUS_FIELDS_FRAGMENT = gql`
  fragment JobStatusFieldsFragment on Job {
    id
    status
    matcherCallScheduled
    cumulativeStatus
    hiredCount
    talentCount
    currentInvestigation {
      id
      startedAt
    }
  }
`
