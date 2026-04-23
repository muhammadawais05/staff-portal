import { gql } from '@apollo/client'

import { unallocatedMemorandumNodesFragment } from '../../../../__fragments__/unallocatedMemorandumFragment.graphql'

export default gql`
  query GetApplyUnallocatedMemorandumsToPaymentGroup($id: ID!) {
    node(id: $id) {
      ... on PaymentGroup {
        id
        number
        subject {
          ... on Talent {
            id
            unallocatedMemorandums {
              ...UnallocatedMemorandumNodesFragment
            }
          }
          ... on TalentPartner {
            id
            unallocatedMemorandums {
              ...UnallocatedMemorandumNodesFragment
            }
          }
          ... on Staff {
            id
            unallocatedMemorandums {
              ...UnallocatedMemorandumNodesFragment
            }
          }
          ... on ReferralPartner {
            id
            unallocatedMemorandums {
              ...UnallocatedMemorandumNodesFragment
            }
          }
          ... on Leader {
            id
            unallocatedMemorandums {
              ...UnallocatedMemorandumNodesFragment
            }
          }
          ... on CompanyRepresentative {
            id
            unallocatedMemorandums {
              ...UnallocatedMemorandumNodesFragment
            }
          }
          ... on Client {
            id
            unallocatedMemorandums {
              ...UnallocatedMemorandumNodesFragment
            }
          }
        }
      }
    }
  }

  ${unallocatedMemorandumNodesFragment}
`
