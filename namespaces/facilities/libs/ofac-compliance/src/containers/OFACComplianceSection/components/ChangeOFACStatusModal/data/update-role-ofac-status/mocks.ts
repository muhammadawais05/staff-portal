import { UserError } from '@staff-portal/graphql/staff'

import { UpdateRoleOfacStatusMutationVariables } from './update-role-ofac-status.staff.gql.types'
import { UPDATE_ROLE_OFAC_STATUS } from './update-role-ofac-status.staff.gql'

export const createUpdateRoleOfacStatusMock = (
  input: UpdateRoleOfacStatusMutationVariables['input']
) => ({
  request: {
    query: UPDATE_ROLE_OFAC_STATUS,
    variables: {
      input
    }
  },
  result: {
    data: {
      updateRoleOfacStatus: {
        success: true,
        errors: [],
        __typename: 'UpdateRoleOfacStatusPayload'
      }
    }
  }
})

export const createUpdateRoleOfacStatusFailedMock = (
  input: UpdateRoleOfacStatusMutationVariables['input']
) => ({
  request: {
    query: UPDATE_ROLE_OFAC_STATUS,
    variables: {
      input
    }
  },
  error: new Error('Failed request')
})

export const createUpdateRoleOfacStatusInvalidMock = (
  input: UpdateRoleOfacStatusMutationVariables['input'],
  errors: Partial<UserError>[]
) => ({
  request: {
    query: UPDATE_ROLE_OFAC_STATUS,
    variables: {
      input
    }
  },
  result: {
    data: {
      updateRoleOfacStatus: {
        success: false,
        errors: errors.map(error => ({
          code: 'base',
          key: 'base',
          message: 'Default user error',
          __typename: 'UserError',
          ...error
        })),
        __typename: 'UpdateRoleOfacStatusPayload'
      }
    }
  }
})
