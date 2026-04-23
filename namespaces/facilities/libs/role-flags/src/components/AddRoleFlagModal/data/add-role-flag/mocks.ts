import {
  AddRoleFlagInput,
  AddRoleFlagPayload,
  UserError
} from '@staff-portal/graphql/staff'

import { ADD_ROLE_FLAG } from './add-role-flag.staff.gql'

export const createAddRoleFlagMock = (input: AddRoleFlagInput) => {
  const mutationResult: AddRoleFlagPayload & {
    __typename: string
    errors: (UserError & { __typename: string })[]
  } = {
    success: true,
    errors: [],
    __typename: 'AddRoleFlagPayload'
  }

  return {
    request: { query: ADD_ROLE_FLAG, variables: { input } },
    result: {
      data: { addRoleFlag: mutationResult }
    }
  }
}

export const createAddRoleFlagFailedMock = (
  input: AddRoleFlagInput,
  errorMessage: string
) => {
  const mutationResult: AddRoleFlagPayload & {
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
    __typename: 'AddRoleFlagPayload'
  }

  return {
    request: { query: ADD_ROLE_FLAG, variables: { input } },
    result: {
      data: { addRoleFlag: mutationResult }
    }
  }
}
