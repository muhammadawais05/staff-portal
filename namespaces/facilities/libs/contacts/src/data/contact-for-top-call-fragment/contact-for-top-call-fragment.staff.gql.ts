import { gql } from '@staff-portal/data-layer-service'

export const CONTACT_FOR_TOP_CALL_FRAGMENT = gql`
  fragment ContactForTopCallFragment on Contact {
    id
    value
    type
  }
`
