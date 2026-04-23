import { gql } from '@staff-portal/data-layer-service'

import { TASK_ENGAGED_SUBJECT_FRAGMENT } from '../task-engaged-subject-fragment'

export const GET_TASK_ENGAGED_SUBJECTS = gql`
  query GetTaskEngagedSubjects($taskId: ID!) {
    node(id: $taskId) {
      ... on Task {
        id
        engagedSubjects {
          # Added totalCount to resolve cache issue from https://github.com/toptal/staff-portal/pull/4758#issuecomment-970197534
          totalCount
          nodes {
            ...RoleTimeZoneFragment
            ...ClientTimeZoneFragment
          }
        }
      }
    }
  }

  ${TASK_ENGAGED_SUBJECT_FRAGMENT}
`
