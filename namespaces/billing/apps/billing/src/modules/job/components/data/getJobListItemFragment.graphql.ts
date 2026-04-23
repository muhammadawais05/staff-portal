import { gql } from '@apollo/client'

// TODO: Remove purchaseOrder fields when PO lines experiment has been released https://toptal-core.atlassian.net/browse/BILL-2144
export const getJobListItemFragment = gql`
  fragment GetJobListItem on Job {
    id
    currentInvestigation {
      id
      startedAt
    }
    hiredCount
    matcherCallScheduled
    talentCount
    engagements {
      nodes {
        id
        purchaseOrder {
          id
        }
        purchaseOrderLine {
          id
        }
        webResource {
          ...WebResourceFragment
        }
      }
      totalCount
    }
    title
    status
    cumulativeStatus
    purchaseOrder {
      id
    }
    purchaseOrderLine {
      id
    }
    webResource {
      ...WebResourceFragment
    }
  }
`
