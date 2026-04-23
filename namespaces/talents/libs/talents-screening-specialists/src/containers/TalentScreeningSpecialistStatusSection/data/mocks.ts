import {
  Maybe,
  SpecialistAssignmentStatuses
} from '@staff-portal/graphql/staff'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import { GET_TALENT_WITH_SCREENING_SPECIALIST } from './get-talent-with-screening-specialist.staff.gql'
import {
  ScreeningSpecialistFragment,
  SpecialistAssignmentFragment,
  SpecialistAssignmentOperationsFragment,
  TssTalentOperationsFragment
} from '../../../data'

type TypeField = {
  __typename: string
}

const createWebResourceMock = () => ({
  url: 'TEST_LINK',
  __typename: 'Link'
})

export const createTalentOperationsMock = (
  fields?: Partial<TssTalentOperationsFragment>
): TssTalentOperationsFragment & TypeField => ({
  assignScreeningSpecialistToTalent: {
    ...createOperationMock(),
    ...fields?.assignScreeningSpecialistToTalent
  },
  __typename: 'TalentOperations'
})

export const createSpecialistOperationsMock = (
  fields?: Partial<SpecialistAssignmentOperationsFragment>
) => ({
  ...fields,
  archiveSpecialistAssignment: {
    ...createOperationMock(),
    ...fields?.archiveSpecialistAssignment
  },
  reactivateSpecialistAssignment: {
    ...createOperationMock(),
    ...fields?.reactivateSpecialistAssignment
  },
  __typename: 'SpecialistAssignmentOperations'
})

export const createStaffMock = (
  assignee?: Partial<ScreeningSpecialistFragment> & { id: string }
): ScreeningSpecialistFragment & TypeField => {
  return {
    id: '123',
    fullName: 'TEST_NAME',
    ...assignee,
    webResource: {
      ...createWebResourceMock(),
      ...assignee?.webResource
    },
    __typename: 'Staff'
  }
}

export const createSpecialistAssignmentMock = (
  assignment?: Maybe<Partial<SpecialistAssignmentFragment>>
): Maybe<SpecialistAssignmentFragment & TypeField> => {
  if (assignment === null) {
    return null
  }

  return {
    id: '123',
    status: SpecialistAssignmentStatuses.ACTIVE,
    archiving: null,
    assignee: createStaffMock(),
    operations: createSpecialistOperationsMock(),
    ...assignment,
    __typename: 'SpecialistAssignment'
  }
}

export const createGetTalentWithScreeningSpecialistMock = ({
  talentId,
  assignment,
  operations
}: {
  talentId: string
  assignment?: Maybe<Partial<SpecialistAssignmentFragment>>
  operations?: Partial<TssTalentOperationsFragment>
}) => ({
  request: {
    query: GET_TALENT_WITH_SCREENING_SPECIALIST,
    variables: { talentId }
  },
  result: {
    data: {
      node: {
        id: talentId,
        currentSpecialistAssignment: createSpecialistAssignmentMock(assignment),
        operations: createTalentOperationsMock(operations),
        __typename: 'Talent'
      },
      __typename: 'Query'
    }
  }
})

export const createGetTalentWithScreeningSpecialistFailedMock = ({
  talentId
}: {
  talentId: string
}) => ({
  request: {
    query: GET_TALENT_WITH_SCREENING_SPECIALIST,
    variables: { talentId }
  },
  error: new Error('Network error occurred')
})
