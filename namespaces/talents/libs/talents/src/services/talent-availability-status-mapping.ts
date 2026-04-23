import { TalentAllocatedHoursAvailability } from '@staff-portal/graphql/staff'

export const TALENT_AVAILABILITY_STATUS_MAPPING: Record<string, string> = {
  [TalentAllocatedHoursAvailability.FULL_TIME]: 'Full-time',
  [TalentAllocatedHoursAvailability.PART_TIME]: 'Part-time',
  [TalentAllocatedHoursAvailability.UNAVAILABLE]: 'Unavailable'
}
