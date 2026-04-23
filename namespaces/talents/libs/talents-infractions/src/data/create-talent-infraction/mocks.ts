import {
  CreateTalentInfractionInput,
  CreateTalentInfractionPayload,
  UserError
} from '@staff-portal/graphql/staff'

import { CREATE_TALENT_INFRACTION } from './create-talent-infraction.staff.gql'

export const createCreateTalentInfractionMock = (
  input: CreateTalentInfractionInput
) => {
  const mutationResult: CreateTalentInfractionPayload & {
    __typename: string
    errors: (UserError & { __typename: string })[]
  } = {
    errors: [],
    success: true,
    __typename: 'CreateTalentInfractionPayload'
  }

  return {
    request: { query: CREATE_TALENT_INFRACTION, variables: { input } },
    result: {
      data: { createTalentInfraction: mutationResult }
    }
  }
}

export const createCreateTalentInfractionFailedMock = (
  input: CreateTalentInfractionInput,
  errorMessage: string
) => {
  const mutationResult: CreateTalentInfractionPayload & {
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
    __typename: 'CreateTalentInfractionPayload'
  }

  return {
    request: { query: CREATE_TALENT_INFRACTION, variables: { input } },
    result: {
      data: { createTalentInfraction: mutationResult }
    }
  }
}
