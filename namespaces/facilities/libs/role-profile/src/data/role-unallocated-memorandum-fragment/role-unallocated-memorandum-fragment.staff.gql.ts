import { gql } from '@staff-portal/data-layer-service'

export const ROLE_UNALLOCATED_MEMORANDUM_FRAGMENT = gql`
  fragment RoleUnallocatedMemorandumFragment on Role {
    unallocatedMemorandum: unallocatedMemorandums {
      totalAmount
      webResource {
        url
        text
      }
    }
  }
`
