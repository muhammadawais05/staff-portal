import {
  ChangeTalentInfractionInput,
  ChangeTalentInfractionPayload,
  UserError
} from '@staff-portal/graphql/staff'

import { CHANGE_TALENT_INFRACTION } from './change-talent-infraction.staff.gql'

export const createChangeTalentInfractionMock = (
  input: ChangeTalentInfractionInput
) => {
  const mutationResult: ChangeTalentInfractionPayload & {
    __typename: string
    errors: (UserError & { __typename: string })[]
  } = {
    errors: [],
    success: true,
    talentInfraction: null,
    __typename: 'ChangeTalentInfractionPayload'
  }

  return {
    request: { query: CHANGE_TALENT_INFRACTION, variables: { input } },
    result: {
      data: { changeTalentInfraction: mutationResult }
    }
  }
}

export const createChangeTalentInfractionFailedMock = (
  input: ChangeTalentInfractionInput,
  errorMessage: string
) => {
  const mutationResult: ChangeTalentInfractionPayload & {
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
    talentInfraction: null,
    __typename: 'ChangeTalentInfractionPayload'
  }

  return {
    request: { query: CHANGE_TALENT_INFRACTION, variables: { input } },
    result: {
      data: { changeTalentInfraction: mutationResult }
    }
  }
}
