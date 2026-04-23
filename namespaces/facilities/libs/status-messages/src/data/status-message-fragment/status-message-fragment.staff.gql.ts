import { gql } from '@staff-portal/data-layer-service'

export const STATUS_MESSAGE_FRAGMENT = gql`
  fragment StatusMessageFragment on StatusMessage {
    closeUrl
    severity
    sticky
    storeKey
    tag
    text
    data {
      key
      value
    }
    __typename
  }
`
