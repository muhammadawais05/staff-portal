import { gql } from '@staff-portal/data-layer-service'

export const TASK_TALENT_SUBJECT_FRAGMENT = gql`
  fragment TaskTalentSubject on Talent {
    id
    __typename
    fullName
    cumulativeStatus
  }
`
