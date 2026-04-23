import { gql } from '@apollo/client'

export const unallocatedMemorandumNodesFragment = gql`
  fragment UnallocatedMemorandumNodesFragment on UnallocatedMemorandumConnection {
    nodes {
      ... on Memorandum {
        ...UnallocatedMemorandumFragment
      }
    }
  }

  fragment UnallocatedMemorandumFragment on Memorandum {
    id
    amountDue
    balance
    description
    number
  }
`
