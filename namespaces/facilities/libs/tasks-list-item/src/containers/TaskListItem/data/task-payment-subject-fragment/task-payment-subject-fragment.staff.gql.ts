import { gql } from '@staff-portal/data-layer-service'

export const TASK_PAYMENT_SUBJECT_FRAGMENT = gql`
  fragment TaskPaymentSubject on Payment {
    id
    __typename
  }
`
