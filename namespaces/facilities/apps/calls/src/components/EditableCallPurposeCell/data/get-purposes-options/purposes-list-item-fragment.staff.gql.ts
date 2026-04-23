import { gql } from '@staff-portal/data-layer-service'

export const PURPOSES_LIST_ITEM_FRAGMENT = gql`
  fragment PurposesListItemFragment on CallPurpose {
    id
    name
    counterpartyType
    viewOrder
  }
`
