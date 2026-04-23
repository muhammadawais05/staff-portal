import { TalentAllocatedHoursAvailability } from '@staff-portal/graphql/staff'

export const TALENT_AVAILABILITY_STATUS_COMPACT_MAPPING: Record<
  string,
  string
> = {
  [TalentAllocatedHoursAvailability.FULL_TIME]: 'FT',
  [TalentAllocatedHoursAvailability.PART_TIME]: 'PT',
  [TalentAllocatedHoursAvailability.UNAVAILABLE]: 'U/A'
}
