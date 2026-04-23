import { UserError } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import {
  ConvertTalentMutation,
  ConvertTalentMutationVariables
} from './convert-talent.staff.gql.types'
import { CONVERT_TALENT } from './convert-talent.staff.gql'

export const createConvertTalentMock = (
  input: ConvertTalentMutationVariables['input']
) => {
  const convertTalent: ConvertTalentMutation['convertTalent'] & {
    __typename: string
    talent: { __typename: string; otherVerticals: { __typename: string } }
  } = {
    success: true,
    errors: [],
    talent: {
      id: encodeEntityId('123', 'Test'),
      type: 'developer',
      otherVerticals: {
        nodes: [],
        __typename: 'TalentVerticalsConnection'
      },
      __typename: 'Talent'
    },
    __typename: 'ConvertTalentPayload'
  }

  return {
    request: {
      query: CONVERT_TALENT,
      variables: { input }
    },
    result: {
      data: { convertTalent }
    }
  }
}

export const createConvertTalentFailedMock = (
  input: ConvertTalentMutationVariables['input']
) => ({
  request: {
    query: CONVERT_TALENT,
    variables: { input }
  },
  error: new Error('Failed request')
})

export const createConvertTalentInvalidMock = (
  input: ConvertTalentMutationVariables['input'],
  errors: Partial<UserError>[]
) => {
  const convertTalent: ConvertTalentMutation['convertTalent'] & {
    __typename: string
    talent: { __typename: string }
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
      id: encodeEntityId('123', 'Test'),
      type: 'developer',
      otherVerticals: {
        nodes: [],
        __typename: 'TalentVerticalsConnection'
      },
      __typename: 'Talent'
    },
    __typename: 'ConvertTalentPayload'
  }

  return {
    request: {
      query: CONVERT_TALENT,
      variables: { input }
    },
    result: { data: { convertTalent } }
  }
}
