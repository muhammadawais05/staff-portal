import { VerifyContractInput } from '@staff-portal/graphql/staff'

import { VERIFY_CONTRACT } from './verify-contract.staff.gql'

export const createVerifyContractMock = (input: VerifyContractInput) => ({
  request: {
    query: VERIFY_CONTRACT,
    variables: { input }
  },
  result: {
    data: {
      verifyContract: {
        success: true,
        errors: [],
        __typename: 'RestoreSpecializationApplicationPayload'
      }
    }
  }
})

export const createVerifyContractInvalidMock = (
  input: VerifyContractInput,
  errorMessage: string
) => ({
  request: {
    query: VERIFY_CONTRACT,
    variables: { input }
  },
  result: {
    data: {
      verifyContract: {
        success: false,
        errors: [
          {
            key: 'base',
            code: 'error',
            message: errorMessage,
            __typename: 'GraniteError'
          }
        ],
        __typename: 'RestoreSpecializationApplicationPayload'
      }
    }
  }
})

export const createVerifyContractFailedMock = (input: VerifyContractInput) => ({
  request: {
    query: VERIFY_CONTRACT,
    variables: { input }
  },
  error: new Error('Error occurred')
})
