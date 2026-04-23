import { gql } from '@staff-portal/data-layer-service'

export const EMAIL_MESSAGE_FRAGMENT = gql`
  fragment EmailMessageFragment on EmailMessage {
    id
    from {
      email
      blacklisted
      __typename
    }
    to {
      email
      blacklisted
      __typename
    }
    categories
    subject
    body
    sentAt
    __typename
  }
`
