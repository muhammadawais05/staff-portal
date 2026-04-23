import { RoleOrClient, UserError } from '@staff-portal/graphql/staff'

import {
  ApplyTalentToAnotherVerticalMutation,
  ApplyTalentToAnotherVerticalMutationVariables
} from './apply-talent-to-another-vertical.staff.gql.types'
import { APPLY_TALENT_TO_ANOTHER_VERTICAL } from './apply-talent-to-another-vertical.staff.gql'

export const createApplyTalentToAnotherVerticalMock = (
  input: ApplyTalentToAnotherVerticalMutationVariables['input']
) => {
  const applyTalentToAnotherVertical: ApplyTalentToAnotherVerticalMutation['applyTalentToAnotherVertical'] & {
    __typename: string
    talent: {
      id: string
      __typename: string
      associatedRoles: { __typename: string; nodes: RoleOrClient[] }
    }
  } = {
    success: true,
    errors: [],
    talent: {
      id: input.talentId,
      associatedRoles: {
        nodes: [],
        __typename: 'RoleOrClientConnection'
      },
      __typename: 'Talent'
    },
    __typename: 'ApplyTalentToAnotherVerticalPayload'
  }

  return {
    request: { query: APPLY_TALENT_TO_ANOTHER_VERTICAL, variables: { input } },
    result: { data: { applyTalentToAnotherVertical } }
  }
}

export const createApplyTalentToAnotherVerticalFailedMock = (
  input: ApplyTalentToAnotherVerticalMutationVariables['input']
) => ({
  request: { query: APPLY_TALENT_TO_ANOTHER_VERTICAL, variables: { input } },
  error: new Error('Failed request')
})

export const createApplyTalentToAnotherVerticalInvalidMock = (
  input: ApplyTalentToAnotherVerticalMutationVariables['input'],
  errors: Partial<UserError>[]
) => {
  const applyTalentToAnotherVertical: ApplyTalentToAnotherVerticalMutation['applyTalentToAnotherVertical'] & {
    __typename: string
    talent: {
      id: string
      __typename: string
      associatedRoles: { __typename: string; nodes: RoleOrClient[] }
    }
  } = {
    success: false,
    errors: errors.map(error => ({
      code: 'base',
      key: 'base',
      message: 'Default user error',
      __typename: 'UserError',
      ...error
    })),
    talent: {
      id: input.talentId,
      associatedRoles: {
        nodes: [],
        __typename: 'RoleOrClientConnection'
      },
      __typename: 'Talent'
    },
    __typename: 'ApplyTalentToAnotherVerticalPayload'
  }

  return {
    request: { query: APPLY_TALENT_TO_ANOTHER_VERTICAL, variables: { input } },
    result: { data: { applyTalentToAnotherVertical } }
  }
}
