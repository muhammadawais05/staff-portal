import { UserError } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Talent } from '@staff-portal/talents-screening-specialists'

import { UnassignScreeningSpecialistsMutationVariables } from './unassign-screening-specialists.staff.gql.types'
import { UNASSIGN_SCREENING_SPECIALISTS } from './unassign-screening-specialists.staff.gql'

type CreateUnassignScreeningSpecialistsMockOptions = {
  talents: Talent[]
  success: boolean
  errors: UserError[]
}

export const createUnassignScreeningSpecialistsMock = ({
  talents,
  success,
  errors
}: CreateUnassignScreeningSpecialistsMockOptions) => {
  return {
    request: {
      query: UNASSIGN_SCREENING_SPECIALISTS,
      variables: {
        input: {
          specialistAssignmentIds: talents.map(
            talent => talent.currentSpecialistAssignment!.id // eslint-disable-line @typescript-eslint/no-non-null-assertion
          )
        }
      }
    },
    newData: jest.fn(() => ({
      data: {
        unassignScreeningSpecialists: {
          specialistAssignments: talents.map(talent => {
            const newAssignmentId = encodeEntityId('123', 'Test')

            return {
              __typename: 'SpecialistAssignment',
              id: newAssignmentId,
              talent: {
                __typename: 'TssTalentFragment',
                ...talent.currentSpecialistAssignment!, // eslint-disable-line @typescript-eslint/no-non-null-assertion
                currentSpecialistAssignment: {
                  __typename: 'SpecialistAssignment',
                  id: newAssignmentId,
                  status: 'active',
                  archiving: null,
                  assignee: null,
                  operations: []
                }
              }
            }
          }),
          success: success,
          errors: errors.map(error => ({
            ...error,
            __typename: 'GraniteError'
          })),
          __typename: 'AssignScreeningSpecialistPayload'
        }
      }
    }))
  }
}

export const createUnassignScreeningSpecialistsFailedMock = ({
  variables
}: {
  variables: UnassignScreeningSpecialistsMutationVariables
}) => ({
  request: { query: UNASSIGN_SCREENING_SPECIALISTS, variables },
  error: new Error('fake error message')
})
