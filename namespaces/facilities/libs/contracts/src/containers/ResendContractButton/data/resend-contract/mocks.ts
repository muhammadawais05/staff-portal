import { ResendContractInput } from '@staff-portal/graphql/staff'

import { RESEND_CONTRACT } from './resend-contract.staff.gql'

export const createResendContractMock = ({
  input,
  success,
  errorMessage
}: {
  input: ResendContractInput
  success: boolean
  errorMessage: string
}) => ({
  request: {
    query: RESEND_CONTRACT,
    variables: { input }
  },
  result: {
    data: {
      resendContract: {
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
        __typename: 'ResendContractPayload'
      }
    }
  }
})

export const createResendContractFailedMock = (input: ResendContractInput) => ({
  request: { query: RESEND_CONTRACT, variables: { input } },
  error: new Error('Error occurred')
})
