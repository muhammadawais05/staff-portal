import { gql } from '@staff-portal/data-layer-service'

export const TASK_CLIENT_SUBJECT_FRAGMENT = gql`
  fragment TaskClientSubject on Client {
    id
    __typename
    fullName
  }
`
