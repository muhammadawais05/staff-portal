import { TalentAllocatedHoursAvailability } from '@staff-portal/graphql/staff'

const getTalentAvailability = (
  commitment?: number | null
): TalentAllocatedHoursAvailability => {
  if (!commitment || commitment <= 0) {
    return TalentAllocatedHoursAvailability.UNAVAILABLE
  }
  if (commitment >= 40) {
    return TalentAllocatedHoursAvailability.FULL_TIME
  }

  return TalentAllocatedHoursAvailability.PART_TIME
}

export default getTalentAvailability
