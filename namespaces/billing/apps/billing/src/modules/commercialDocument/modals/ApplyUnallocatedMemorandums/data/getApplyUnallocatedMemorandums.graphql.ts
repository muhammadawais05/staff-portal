import { gql } from '@apollo/client'

import { unallocatedMemorandumNodesFragment } from '../../../../__fragments__/unallocatedMemorandumFragment.graphql'

export default gql`
  query GetApplyUnallocatedMemorandumsToCommercialDocument($id: ID!) {
    node(id: $id) {
      ... on Invoice {
        documentNumber
        id
        subjectObject {
          availablePrepaymentBalanceNullable
          id
          unallocatedMemorandums {
            ...UnallocatedMemorandumNodesFragment
          }
        }
      }
      ... on Payment {
        documentNumber
        id
        subjectObject {
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
            availablePrepaymentBalanceNullable
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
