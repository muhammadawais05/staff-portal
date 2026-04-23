import { gql } from '@staff-portal/data-layer-service'

export const INVESTIGATION_JOB_FRAGMENT = gql`
  fragment InvestigationJobFragment on Job {
    id
    talentCount
    status
    hiredCount
    matcherCallScheduled
    cumulativeStatus
    title
    webResource {
      text
      url
    }
    currentTalents {
      nodes {
        ... on Talent {
          id
          fullName
          webResource {
            text
            url
          }
        }
      }
      totalCount
    }
    claimer {
      id
      fullName
      webResource {
        text
        url
      }
    }
    currentInvestigation {
      id
      startedAt
    }
  }
`
