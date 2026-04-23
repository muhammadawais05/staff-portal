import { DestroyContractInput } from '@staff-portal/graphql/staff'

import { DESTROY_CONTRACT } from './destroy-contract.staff.gql'

export const createDestroyContractMock = ({
  input,
  success,
  errorMessage
}: {
  input: DestroyContractInput
  success: boolean
  errorMessage: string
}) => ({
  request: {
    query: DESTROY_CONTRACT,
    variables: { input }
  },
  result: {
    data: {
      destroyContract: {
        contract: {
          id: input.contractId,
          __typename: 'Contract'
        },
        success,
        errors: [
          {
            key: 'base',
            code: 'someError',
            message: errorMessage,
            __typename: 'GraniteError'
          }
        ],
        __typename: 'DestroyContractPayload'
      }
    }
  }
})

export const createDestroyContractFailedMock = (
  input: DestroyContractInput
) => ({
  request: { query: DESTROY_CONTRACT, variables: { input } },
  error: new Error('Error occurred')
})
