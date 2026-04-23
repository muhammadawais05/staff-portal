import {
  UserError,
  SpecialistAssignmentArchivingReasons
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { ArchiveSpecialistAssignmentsMutationVariables } from './archive-specialist-assignments.staff.gql.types'
import { SpecialistAssignmentFragment } from '../../../../data/specialist-assignment-fragment.staff.gql.types'
import { ARCHIVE_SPECIALIST_ASSIGNMENTS } from './archive-specialist-assignments.staff.gql'

type ArchiveSpecialistAssignmentsMockOptions = {
  assignments: SpecialistAssignmentFragment[]
  reason: SpecialistAssignmentArchivingReasons
  comment?: string
  success: boolean
  errors: UserError[]
}

export const createArchiveSpecialistAssignmentsMock = ({
  assignments,
  reason,
  comment,
  success,
  errors
}: ArchiveSpecialistAssignmentsMockOptions) => {
  return {
    request: {
      query: ARCHIVE_SPECIALIST_ASSIGNMENTS,
      variables: {
        input: {
          specialistAssignmentIds: assignments.map(assignment => assignment.id),
          reason,
          comment
        }
      }
    },
    result: {
      data: {
        archiveSpecialistAssignments: {
          specialistAssignments: assignments.map(assignment => {
            return {
              __typename: 'SpecialistAssignment',
              id: assignment.id,
              talent: {
                __typename: 'TssTalentFragment',
                id: encodeEntityId('123', 'Test'),
                currentSpecialistAssignment: {
                  __typename: 'SpecialistAssignment',
                  id: assignment.id,
                  status: 'archived',
                  archiving: null,
                  assignee: {
                    id: encodeEntityId('123', 'Test'),
                    __typename: 'Staff',
                    fullName: 'Test Name',
                    ...assignment.assignee
                  },
                  operations: []
                }
              }
            }
          }),
          success,
          errors: errors.map(error => ({
            ...error,
            __typename: 'GraniteError'
          })),
          __typename: 'ArchiveSpecialistAssignmentPayload'
        }
      }
    }
  }
}

export const createArchiveSpecialistAssignmentsFailedMock = ({
  variables
}: {
  variables: ArchiveSpecialistAssignmentsMutationVariables
}) => ({
  request: { query: ARCHIVE_SPECIALIST_ASSIGNMENTS, variables },
  error: new Error('fake error message')
})
