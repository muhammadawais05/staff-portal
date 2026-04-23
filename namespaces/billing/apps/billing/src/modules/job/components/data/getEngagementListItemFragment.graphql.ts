import { gql } from '@apollo/client'

// TODO: Remove purchaseOrder fields when PO lines experiment has been released https://toptal-core.atlassian.net/browse/BILL-2144
export const getEngagementListItemFragment = gql`
  fragment GetEngagementListItem on Engagement {
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
    job {
      ...GetJobListItem
    }
  }
`
