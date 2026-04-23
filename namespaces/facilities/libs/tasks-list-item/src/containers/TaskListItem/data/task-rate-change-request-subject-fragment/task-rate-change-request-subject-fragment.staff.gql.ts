import { gql } from '@staff-portal/data-layer-service'

export const TASK_RATE_CHANGE_REQUEST_SUBJECT_FRAGMENT = gql`
  fragment TaskRateChangeRequestSubject on RateChangeRequest {
    id
    requestTypeEnumValue
    __typename
  }
`
