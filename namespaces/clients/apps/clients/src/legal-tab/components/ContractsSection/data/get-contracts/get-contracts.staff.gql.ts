import { gql, useGetStaffNode } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { CONTRACT_FRAGMENT } from '../../data/contract-fragment'
import { DEFAULT_CONTACT_FRAGMENT } from '../default-contact-fragment'
import { GetContractsDocument } from './get-contracts.staff.gql.types'

export const GET_CONTRACTS = gql`
  query GetContracts($clientId: ID!, $showDescendants: Boolean!) {
    staffNode(id: $clientId) {
      ... on Client {
        id
        contact {
          ...DefaultContactFragment
        }
        contracts(
          filter: {
            showDescendants: $showDescendants
            scope: ACTIVE_OR_EXPIRED
          }
        ) {
          nodes {
            ...ContractFragment
          }
        }
        children {
          totalCount
        }
        operations {
          sendSTA {
            ...OperationFragment
          }
        }
      }
    }
  }
  ${DEFAULT_CONTACT_FRAGMENT}
  ${CONTRACT_FRAGMENT}
  ${OPERATION_FRAGMENT}
`

export const useGetContracts = (clientId: string, showDescendants: boolean) => {
  const { data: company, ...rest } = useGetStaffNode(GetContractsDocument)({
    clientId,
    showDescendants
  })

  return { company, ...rest }
}
