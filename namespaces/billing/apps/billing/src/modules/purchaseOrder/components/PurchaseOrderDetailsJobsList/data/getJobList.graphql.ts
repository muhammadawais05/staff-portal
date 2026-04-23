import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

import { getJobListItemFragment } from '../../../../job/components/data/getJobListItemFragment.graphql'
import { getEngagementListItemFragment } from '../../../../job/components/data/getEngagementListItemFragment.graphql'

export default gql`
  query GetJobList($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on PurchaseOrder {
        id
        jobs {
          nodes {
            ...GetJobListItem
          }
        }
        engagements {
          nodes {
            ...GetEngagementListItem
          }
        }
      }
    }
  }

  ${webResourceFragment}

  ${getJobListItemFragment}
  ${getEngagementListItemFragment}
`
