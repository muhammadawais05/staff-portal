import {
  TalentCumulativeStatus,
  OperationCallableTypes,
  TalentDetailedStatuses,
  SpecialistAssignmentStatuses,
  Scalars
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { SpecialistAssignmentArchivingFragment } from './specialist-assignment-archiving-fragment.staff.gql.types'
import { SpecialistAssignmentFragment } from './specialist-assignment-fragment.staff.gql.types'
import { Talent, Assignee } from '../types'

export const createTalentMock = (
  fields?: Partial<Talent>
): Talent & {
  __typename: string
} => ({
  id: encodeEntityId('123', 'Test'),
  fullName: 'Test Name',
  cumulativeStatus: TalentCumulativeStatus.APPLIED,
  detailedStatus: TalentDetailedStatuses.ENGLISH_APPROVED,
  talentType: 'Developer',
  screeningRank: 1,
  photo: null,
  roleFlags: null,
  specializationApplications: {
    nodes: [
      {
        id: 'test-id',
        specialization: { id: 'test-id', title: 'Core' }
      }
    ]
  },
  webResource: {
    url: 'http://toptal.com/talents/123'
  },
  operations: {
    assignScreeningSpecialistToTalent: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  currentSpecialistAssignment: createSpecialistAssignmentMock(),
  __typename: 'TssTalentFragment',
  ...fields
})

export const createSpecialistAssignmentMock = (
  fields?: Partial<SpecialistAssignmentFragment>
): SpecialistAssignmentFragment & {
  __typename: string
} => ({
  id: encodeEntityId('123', 'Test'),
  status: SpecialistAssignmentStatuses.ACTIVE,
  operations: {
    archiveSpecialistAssignment: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    reactivateSpecialistAssignment: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  archiving: null,
  assignee: createStaffMock(),
  __typename: 'SpecialistAssignmentFragment',
  ...fields
})

export const createStaffMock = (fields?: Partial<Assignee>) => ({
  id: encodeEntityId('123', 'Test'),
  fullName: 'TEST_NAME',
  webResource: {
    url: 'TEST_LINK',
    __typename: 'Link'
  },
  ...fields
})

export const createSpecialistAssignmentArchivingMock = (
  fields?: Partial<SpecialistAssignmentArchivingFragment>
) => {
  const createdAt: Scalars['Date'] = '2018-09-07'

  return {
    comment: 'Comment',
    createdAt,
    reason: 'covid19',
    __typename: 'SpecialistAssignmentArchivingFragment',
    ...fields
  }
}
