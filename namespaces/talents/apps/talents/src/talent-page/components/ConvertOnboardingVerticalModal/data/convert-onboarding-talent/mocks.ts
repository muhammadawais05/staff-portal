import { UserError } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import {
  ConvertOnboardingTalentMutation,
  ConvertOnboardingTalentMutationVariables
} from './convert-onboarding-talent.staff.gql.types'
import { CONVERT_ONBOARDING_TALENT } from './convert-onboarding-talent.staff.gql'

export const createConvertOnboardingTalentMock = (
  input: ConvertOnboardingTalentMutationVariables['input']
) => {
  const convertOnboardingTalent: ConvertOnboardingTalentMutation['convertOnboardingTalent'] & {
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
    __typename: 'ConvertOnboardingTalentPayload'
  }

  return {
    request: { query: CONVERT_ONBOARDING_TALENT, variables: { input } },
    result: { data: { convertOnboardingTalent } }
  }
}

export const createConvertOnboardingTalentFailedMock = (
  input: ConvertOnboardingTalentMutationVariables['input']
) => ({
  request: { query: CONVERT_ONBOARDING_TALENT, variables: { input } },
  error: new Error('Failed request')
})

export const createConvertOnboardingTalentInvalidMock = (
  input: ConvertOnboardingTalentMutationVariables['input'],
  errors: Partial<UserError>[]
) => {
  const convertOnboardingTalent: ConvertOnboardingTalentMutation['convertOnboardingTalent'] & {
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
    __typename: 'ConvertOnboardingTalentPayload'
  }

  return {
    request: { query: CONVERT_ONBOARDING_TALENT, variables: { input } },
    result: { data: { convertOnboardingTalent } }
  }
}
