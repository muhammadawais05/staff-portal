import { TalentSpecializationApplicationStatus } from '@staff-portal/graphql/staff'

export const createGetTalentProfileSpecializationFragmentMock = (
  prefix: string,
  status: TalentSpecializationApplicationStatus
) => ({
  id: 'test-id',
  status,
  specialization: {
    id: 'test-id',
    title: `${prefix}-${status}`
  }
})
