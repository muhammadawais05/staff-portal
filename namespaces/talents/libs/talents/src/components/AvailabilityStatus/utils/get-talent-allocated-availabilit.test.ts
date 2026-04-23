import { TalentAllocatedHoursAvailability } from '@staff-portal/graphql/staff'

import getTalentAvailability from './get-talent-allocated-availability'

describe('getTalentAvailability', () => {
  it('returns unavailable', () => {
    expect(getTalentAvailability(null)).toBe(
      TalentAllocatedHoursAvailability.UNAVAILABLE
    )
    expect(getTalentAvailability(undefined)).toBe(
      TalentAllocatedHoursAvailability.UNAVAILABLE
    )
    expect(getTalentAvailability(0)).toBe(
      TalentAllocatedHoursAvailability.UNAVAILABLE
    )
  })

  it('returns part-time availability', () => {
    expect(getTalentAvailability(1)).toBe(
      TalentAllocatedHoursAvailability.PART_TIME
    )
    expect(getTalentAvailability(39)).toBe(
      TalentAllocatedHoursAvailability.PART_TIME
    )
  })

  it('returns full-time availability', () => {
    expect(getTalentAvailability(40)).toBe(
      TalentAllocatedHoursAvailability.FULL_TIME
    )
    expect(getTalentAvailability(100)).toBe(
      TalentAllocatedHoursAvailability.FULL_TIME
    )
  })
})
