import { gql } from '@staff-portal/data-layer-service'

export const TASK_JOB_SUBJECT_FRAGMENT = gql`
  fragment TaskJobSubject on Job {
    id
    __typename
    title
    jobType
  }
`
