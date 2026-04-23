import {
  RemoveRoleFlagInput,
  RemoveRoleFlagPayload,
  UserError
} from '@staff-portal/graphql/staff'

import { REMOVE_ROLE_FLAG } from './remove-role-flag.staff.gql'

export const createRemoveRoleFlagMock = (input: RemoveRoleFlagInput) => {
  const mutationResult: RemoveRoleFlagPayload & {
    __typename: string
    errors: (UserError & { __typename: string })[]
  } = {
    success: true,
    errors: [],
    __typename: 'RemoveRoleFlagPayload'
  }

  return {
    request: { query: REMOVE_ROLE_FLAG, variables: { input } },
    result: {
      data: { removeRoleFlag: mutationResult }
    }
  }
}

export const createRemoveRoleFlagFailedMock = (
  input: RemoveRoleFlagInput,
  errorMessage: string
) => {
  const mutationResult: RemoveRoleFlagPayload & {
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
    __typename: 'RemoveRoleFlagPayload'
  }

  return {
    request: { query: REMOVE_ROLE_FLAG, variables: { input } },
    result: {
      data: { removeRoleFlag: mutationResult }
    }
  }
}
