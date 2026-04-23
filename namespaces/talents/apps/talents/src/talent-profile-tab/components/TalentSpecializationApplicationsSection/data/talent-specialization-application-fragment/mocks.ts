import {
  OperationCallableTypes,
  SpecializationApplicationRejectionReasonValue,
  TalentSpecializationApplicationStatus
} from '@staff-portal/graphql/staff'

import { TalentSpecializationApplicationFragment } from './talent-specialization-application-fragment.staff.gql.types'

export const createTalentSpecializationApplicationSectionMock = (
  specializationApplication: Partial<TalentSpecializationApplicationFragment> = {}
): TalentSpecializationApplicationFragment => ({
  id: '123',
  status: TalentSpecializationApplicationStatus.APPROVED,
  startedAt: '2020-03-11T09:49:20+0000',
  completedAt: '2020-04-11T09:49:20+0000',
  operations: {
    id: 'test-id',
    convertSpecializationApplication: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    rejectSpecializationApplication: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    restoreSpecializationApplication: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  specialization: {
    id: 'abc123',
    title: 'Test Specialization Title'
  },
  rejectionReason: {
    comment: 'Test Comment',
    place: 'Test Place',
    reason: SpecializationApplicationRejectionReasonValue.SKILLS_NOT_A_FIT,
    id: '789'
  },
  rejectNoteTasks: {
    totalCount: 0
  },
  performer: {
    id: 'test-id',
    webResource: {
      text: 'Test Text',
      url: 'https://example.com/test-url'
    }
  },
  ...specializationApplication
})
