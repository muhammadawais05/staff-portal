import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import {
  MockedResponse,
  encodeEntityId
} from '@staff-portal/data-layer-service'

import { GetContractsQuery } from './get-contracts.staff.gql.types'
import { ContractFragment } from '../contract-fragment'
import { GET_CONTRACTS } from './get-contracts.staff.gql'
import { createContractFragmentMock } from '../contract-fragment/mocks'

export const createGetContractsQueryMock = (
  partialClient: Partial<GetContractsQuery['staffNode']> = {},
  partialContracts: Partial<ContractFragment>[] = [{}],
  clientId = 'mock-id'
): GetContractsQuery => {
  const defaultClient = {
    id: clientId,
    fullName: 'Mock Company',
    contact: {
      id: encodeEntityId('123', 'Test'),
      fullName: 'Mock Contact',
      email: 'mock@contact.com',
      __typename: 'CompanyRepresentative'
    },
    contracts: {
      nodes: partialContracts.map(partialContract =>
        createContractFragmentMock(partialContract)
      ),
      __typename: 'ContractConnection'
    },
    operations: {
      sendSTA: {
        callable: OperationCallableTypes.HIDDEN,
        messages: [],
        __typename: 'Operation'
      }
    },
    children: { totalCount: 0 },
    __typename: 'Client'
  }

  return {
    staffNode: {
      ...defaultClient,
      ...partialClient
    }
  }
}

export const createGetContractsMock = (
  partialClient: Partial<GetContractsQuery['staffNode']> = {},
  partialContracts: Partial<ContractFragment>[] = [{}],
  clientId = 'mock-id'
) => ({
  request: {
    query: GET_CONTRACTS,
    variables: { clientId }
  },
  result: {
    data: createGetContractsQueryMock(partialClient, partialContracts, clientId)
  }
})

export const createGetContractsFailedMock = (
  clientId = 'mock-id',
  errorMessage?: string
): MockedResponse => ({
  request: {
    query: GET_CONTRACTS,
    variables: { clientId }
  },
  error: new Error(errorMessage)
})
