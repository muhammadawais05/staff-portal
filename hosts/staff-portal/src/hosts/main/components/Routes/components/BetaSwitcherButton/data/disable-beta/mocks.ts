import { UserError } from '@staff-portal/graphql/staff'
import { mapToTypename } from '@staff-portal/test-utils'

import { DISABLE_BETA } from './disable-beta.staff.gql'

export const createDisableBetaMock = (
  success = true,
  errors: UserError[] = []
) => ({
  request: { query: DISABLE_BETA },
  result: {
    data: {
      disableBeta: {
        __typename: 'MutationResult',
        success,
        errors: mapToTypename(errors, 'UserError')
      }
    }
  }
})

export const createDisableBetaFailedMock = (
  errorMessage = 'Network error occurred.'
) => ({
  request: { query: DISABLE_BETA },
  error: new Error(errorMessage)
})
