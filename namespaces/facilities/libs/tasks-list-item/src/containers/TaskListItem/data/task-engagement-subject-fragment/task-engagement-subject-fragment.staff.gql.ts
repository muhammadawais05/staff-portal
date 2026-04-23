import { gql } from '@staff-portal/data-layer-service'

import { TASK_JOB_SUBJECT_FRAGMENT } from '../task-job-subject-fragment'

export const TASK_ENGAGEMENT_SUBJECT_FRAGMENT = gql`
  fragment TaskEngagementSubject on Engagement {
    id
    __typename
    job {
      ...TaskJobSubject
    }
  }
  ${TASK_JOB_SUBJECT_FRAGMENT}
`
