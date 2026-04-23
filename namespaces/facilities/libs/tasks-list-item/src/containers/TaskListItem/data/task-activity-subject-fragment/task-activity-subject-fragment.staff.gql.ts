import { gql } from '@staff-portal/data-layer-service'

export const TASK_ACTIVITY_SUBJECT_FRAGMENT = gql`
  fragment TaskActivitySubjectFragment on Activity {
    id
  }
`
