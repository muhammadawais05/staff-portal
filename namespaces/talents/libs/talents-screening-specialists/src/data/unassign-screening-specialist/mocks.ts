import {
  UserError,
  SpecialistAssignmentStatuses
} from '@staff-portal/graphql/staff'

import { UnassignScreeningSpecialistMutationVariables } from './unassign-screening-specialist.staff.gql.types'
import { SpecialistAssignmentFragment } from '../specialist-assignment-fragment.staff.gql.types'
import { UNASSIGN_SCREENING_SPECIALIST } from './unassign-screening-specialist.staff.gql'
import { createSpecialistAssignmentMock, createTalentMock } from '../mocks'

type CreateUnassignScreeningSpecialistMockOptions = {
  specialistAssignment: SpecialistAssignmentFragment | null
  success: boolean
  errors: UserError[]
}

export const createUnassignScreeningSpecialistMock = ({
  specialistAssignment,
  success,
  errors
}: CreateUnassignScreeningSpecialistMockOptions) => {
  const talent = createTalentMock()

  const newAssignmentMock = createSpecialistAssignmentMock({
    status: SpecialistAssignmentStatuses.NONE
  })

  return {
    request: {
      query: UNASSIGN_SCREENING_SPECIALIST,
      variables: {
        input: {
          specialistAssignmentId: specialistAssignment?.id
        }
      }
    },
    result: {
      data: {
        unassignScreeningSpecialist: {
          specialistAssignment: {
            ...newAssignmentMock,
            __typename: 'SpecialistAssignment',
            talent
          },
          errors: errors.map(error => ({
            ...error,
            __typename: 'GraniteError'
          })),
          success,
          __typename: 'UnassignScreeningSpecialistPayload'
        }
      }
    }
  }
}

export const createUnassignScreeningSpecialistFailedMock = ({
  variables
}: {
  variables: UnassignScreeningSpecialistMutationVariables
}) => ({
  request: { query: UNASSIGN_SCREENING_SPECIALIST, variables },
  error: new Error('fake error message')
})
