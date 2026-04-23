import { TalentAllocatedHoursAvailability } from '@staff-portal/graphql/staff'

type AvailabilityColorType = 'green' | 'yellow' | 'red'

export const TALENT_AVAILABILITY_COLOR_MAPPING: Record<
  string,
  AvailabilityColorType
> = {
  [TalentAllocatedHoursAvailability.FULL_TIME]: 'green',
  [TalentAllocatedHoursAvailability.PART_TIME]: 'yellow',
  [TalentAllocatedHoursAvailability.UNAVAILABLE]: 'red'
}
