import { gql } from '@staff-portal/data-layer-service'

import { JOB_LIST_ITEM_FRAGMENT } from '../job-list-item-fragment'

export default gql`
  query GetJobListItem($jobId: ID!) {
    node(id: $jobId) {
      ... on Job {
        ...JobListItemFragment
      }
    }
  }

  ${JOB_LIST_ITEM_FRAGMENT}
`
