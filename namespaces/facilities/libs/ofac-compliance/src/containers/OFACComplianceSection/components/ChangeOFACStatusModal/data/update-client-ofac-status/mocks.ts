import { UserError } from '@staff-portal/graphql/staff'

import { UpdateClientOfacStatusMutationVariables } from './update-client-ofac-status.staff.gql.types'
import { UPDATE_CLIENT_OFAC_STATUS } from './update-client-ofac-status.staff.gql'

export const createUpdateClientOfacStatusMock = (
  input: UpdateClientOfacStatusMutationVariables['input']
) => ({
  request: {
    query: UPDATE_CLIENT_OFAC_STATUS,
    variables: {
      input
    }
  },
  result: {
    data: {
      updateClientOfacStatus: {
        success: true,
        errors: [],
        __typename: 'UpdateClientOfacStatusPayload'
      }
    }
  }
})

export const createUpdateClientOfacStatusFailedMock = (
  input: UpdateClientOfacStatusMutationVariables['input']
) => ({
  request: {
    query: UPDATE_CLIENT_OFAC_STATUS,
    variables: {
      input
    }
  },
  error: new Error('Failed request')
})

export const createUpdateClientOfacStatusInvalidMock = (
  input: UpdateClientOfacStatusMutationVariables['input'],
  errors: Partial<UserError>[]
) => ({
  request: {
    query: UPDATE_CLIENT_OFAC_STATUS,
    variables: {
      input
    }
  },
  result: {
    data: {
      updateClientOfacStatus: {
        success: false,
        errors: errors.map(error => ({
          code: 'base',
          key: 'base',
          message: 'Default user error',
          __typename: 'UserError',
          ...error
        })),
        __typename: 'UpdateClientOfacStatusPayload'
      }
    }
  }
})
