import {
  RemoveTalentInfractionInput,
  RemoveTalentInfractionPayload,
  UserError
} from '@staff-portal/graphql/staff'

import { REMOVE_TALENT_INFRACTION } from './remove-talent-infraction.staff.gql'

export const createRemoveTalentInfractionMock = (
  input: RemoveTalentInfractionInput
) => {
  const mutationResult: RemoveTalentInfractionPayload & {
    __typename: string
    errors: (UserError & { __typename: string })[]
  } = {
    errors: [],
    success: true,
    __typename: 'RemoveTalentInfractionPayload'
  }

  return {
    request: { query: REMOVE_TALENT_INFRACTION, variables: { input } },
    result: {
      data: { removeTalentInfraction: mutationResult }
    }
  }
}

export const createRemoveTalentInfractionFailedMock = (
  input: RemoveTalentInfractionInput,
  errorMessage: string
) => {
  const mutationResult: RemoveTalentInfractionPayload & {
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
    __typename: 'RemoveTalentInfractionPayload'
  }

  return {
    request: { query: REMOVE_TALENT_INFRACTION, variables: { input } },
    result: {
      data: { removeTalentInfraction: mutationResult }
    }
  }
}
