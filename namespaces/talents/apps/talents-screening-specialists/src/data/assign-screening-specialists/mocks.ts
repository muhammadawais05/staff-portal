import { UserError } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  ScreeningSpecialistFragment,
  Talent
} from '@staff-portal/talents-screening-specialists'

import { AssignScreeningSpecialistsMutationVariables } from './assign-screening-specialists.staff.gql.types'
import { ASSIGN_SCREENING_SPECIALISTS } from './assign-screening-specialists.staff.gql'

type CreateAssignScreeningSpecialistsMockOptions = {
  talents: Talent[]
  specialist: ScreeningSpecialistFragment
  success: boolean
  errors: UserError[]
}

export const createAssignScreeningSpecialistsMock = ({
  talents,
  specialist,
  success,
  errors
}: CreateAssignScreeningSpecialistsMockOptions) => {
  const assignScreeningSpecialistsMutationMock = {
    assignScreeningSpecialists: {
      specialistAssignments: talents.map(talent => {
        return {
          id: encodeEntityId('123', 'Test'),
          talent: talent
        }
      }),
      errors,
      success
    }
  }

  return {
    request: {
      query: ASSIGN_SCREENING_SPECIALISTS,
      variables: {
        input: {
          talentIds: talents.map(talent => talent.id),
          assigneeId: specialist.id
        }
      }
    },
    newData: jest.fn(() => ({
      data: {
        assignScreeningSpecialists: {
          specialistAssignments: talents.map(talent => {
            const newAssignmentId = encodeEntityId('123', 'Test')

            return {
              __typename: 'SpecialistAssignment',
              id: newAssignmentId,
              talent: {
                __typename: 'TssTalentFragment',
                ...talent,
                currentSpecialistAssignment: {
                  __typename: 'SpecialistAssignment',
                  id: newAssignmentId,
                  status: 'active',
                  archiving: null,
                  assignee: {
                    __typename: 'Staff',
                    ...specialist
                  },
                  operations: []
                }
              }
            }
          }),
          success:
            assignScreeningSpecialistsMutationMock.assignScreeningSpecialists
              .success,
          errors:
            assignScreeningSpecialistsMutationMock.assignScreeningSpecialists.errors.map(
              error => ({
                ...error,
                __typename: 'GraniteError'
              })
            ),
          __typename: 'AssignScreeningSpecialistPayload'
        }
      }
    }))
  }
}

export const createAssignScreeningSpecialistsFailedMock = ({
  variables
}: {
  variables: AssignScreeningSpecialistsMutationVariables
}) => ({
  request: { query: ASSIGN_SCREENING_SPECIALISTS, variables },
  error: new Error('fake error message')
})
