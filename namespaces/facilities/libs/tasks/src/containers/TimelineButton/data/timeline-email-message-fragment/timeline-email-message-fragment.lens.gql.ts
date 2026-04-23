import { gql } from '@staff-portal/data-layer-service'

export const TIMELINE_EMAIL_MESSAGE_FRAGMENT = gql`
  fragment TimelineEmailMessageFragment on EmailMessage {
    id
    from {
      email
      __typename
    }
    to {
      email
      __typename
    }
    body
    subject
    sentAt
    __typename
  }
`
