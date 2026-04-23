import { CommitmentAvailability } from '@staff-portal/graphql/staff'

import { isExtraHoursHidden } from './is-extra-hours-hidden'

const truthyCases: [CommitmentAvailability, boolean | undefined][] = [
  [CommitmentAvailability.hourly, undefined],
  [CommitmentAvailability.full_time, true],
  [CommitmentAvailability.part_time, true]
]

const falsyCases: [CommitmentAvailability, boolean | undefined][] = [
  [CommitmentAvailability.full_time, false],
  [CommitmentAvailability.part_time, undefined]
]

describe('#isExtraHoursHidden', () => {
  describe('returns true', () => {
    it.each(truthyCases)('%s', (availability, enterprise) => {
      expect(isExtraHoursHidden({ availability, enterprise })).toBeTruthy()
    })
  })

  describe('returns false', () => {
    it.each(falsyCases)('%s', (availability, enterprise) => {
      expect(isExtraHoursHidden({ availability, enterprise })).toBeFalsy()
    })
  })
})
