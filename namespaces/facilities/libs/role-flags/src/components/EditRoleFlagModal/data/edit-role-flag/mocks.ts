import {
  UpdateRoleFlagInput,
  UpdateRoleFlagPayload,
  UserError
} from '@staff-portal/graphql/staff'

import { UPDATE_ROLE_FLAG } from './edit-role-flag.staff.gql'

export const createUpdateRoleFlagMock = (input: UpdateRoleFlagInput) => {
  const mutationResult: UpdateRoleFlagPayload & {
    __typename: string
    errors: (UserError & { __typename: string })[]
  } = {
    success: true,
    errors: [],
    __typename: 'UpdateRoleFlagPayload'
  }

  return {
    request: { query: UPDATE_ROLE_FLAG, variables: { input } },
    result: {
      data: { updateRoleFlag: mutationResult }
    }
  }
}

export const createUpdateRoleFlagFailedMock = (
  input: UpdateRoleFlagInput,
  errorMessage: string
) => {
  const mutationResult: UpdateRoleFlagPayload & {
    __typename: string
    errors: (UserError & { __typename: string })[]
  } = {
    success: false,
    errors: [
      {
        code: 'ErrorOccurred',
        key: 'base',
        message: errorMessage || 'Error occurred',
        __typename: 'GraniteError'
      }
    ],
    __typename: 'UpdateRoleFlagPayload'
  }

  return {
    request: { query: UPDATE_ROLE_FLAG, variables: { input } },
    result: {
      data: { updateRoleFlag: mutationResult }
    }
  }
}
