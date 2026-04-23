import { gql } from '@staff-portal/data-layer-service'

export const CALL_RECIPIENT_CONTACT_FRAGMENT = gql`
  fragment CallRecipientContactFragment on Contact {
    id
    value
  }
`
