import { TalentSpecializationApplicationStatus } from '@staff-portal/graphql/staff'

export const SPECIALIZATION_APPLICATION_STATUS_TEXT_MAPPING: Record<
  TalentSpecializationApplicationStatus,
  string
> = {
  [TalentSpecializationApplicationStatus.PENDING]: 'Applied',
  [TalentSpecializationApplicationStatus.APPROVED]: 'Approved',
  [TalentSpecializationApplicationStatus.REJECTED]: 'Rejected',
  [TalentSpecializationApplicationStatus.REJECTED_INACTIVE]:
    'Rejected (inactive)',
  [TalentSpecializationApplicationStatus.CANCELLED]: 'Cancelled'
}
