import { UserError } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { AssignScreeningSpecialistMutationVariables } from './assign-screening-specialist.staff.gql.types'
import { ScreeningSpecialistFragment } from '../screening-specialist-fragment.staff.gql.types'
import { Talent } from '../../types'
import { ASSIGN_SCREENING_SPECIALIST } from './assign-screening-specialist.staff.gql'

type CreateAssignScreeningSpecialistMockOptions = {
  talent: Talent
  specialist: ScreeningSpecialistFragment
  success: boolean
  errors: UserError[]
}

export const createAssignScreeningSpecialistMock = ({
  talent,
  specialist,
  success,
  errors
}: CreateAssignScreeningSpecialistMockOptions) => {
  const assignScreeningSpecialistMutationMock = {
    assignScreeningSpecialist: {
      specialistAssignment: {
        id: encodeEntityId('123', 'Test'),
        talent: talent
      },
      errors,
      success
    }
  }

  return {
    request: {
      query: ASSIGN_SCREENING_SPECIALIST,
      variables: {
        input: {
          talentId: talent.id,
          assigneeId: specialist.id
        }
      }
    },
    result: {
      data: {
        assignScreeningSpecialist: {
          specialistAssignment: {
            __typename: 'SpecialistAssignment',
            id: assignScreeningSpecialistMutationMock.assignScreeningSpecialist
              .specialistAssignment.id,
            talent: {
              __typename: 'TssTalentFragment',
              ...talent,
              currentSpecialistAssignment: {
                __typename: 'SpecialistAssignment',
                id: assignScreeningSpecialistMutationMock
                  .assignScreeningSpecialist.specialistAssignment.id,
                status: 'active',
                archiving: null,
                assignee: {
                  __typename: 'Staff',
                  ...specialist,
                  webResource: {
                    url: 'some-url',
                    __typename: 'WebResource'
                  }
                },
                operations: []
              }
            }
          },
          success:
            assignScreeningSpecialistMutationMock.assignScreeningSpecialist
              .success,
          errors:
            assignScreeningSpecialistMutationMock.assignScreeningSpecialist.errors.map(
              error => ({
                ...error,
                __typename: 'GraniteError'
              })
            ),
          __typename: 'AssignScreeningSpecialistPayload'
        }
      }
    }
  }
}

export const createAssignScreeningSpecialistFailedMock = ({
  variables
}: {
  variables: AssignScreeningSpecialistMutationVariables
}) => ({
  request: { query: ASSIGN_SCREENING_SPECIALIST, variables },
  error: new Error('fake error message')
})
