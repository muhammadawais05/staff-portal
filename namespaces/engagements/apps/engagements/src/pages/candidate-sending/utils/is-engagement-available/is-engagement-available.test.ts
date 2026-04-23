import isEngagementAvailable from './is-engagement-available'

describe('isEngagementAvailable', () => {
  it.each([
    {
      availableHours: 15,
      expectedWeeklyHoursWithDefault: 10,
      result: true
    },
    {
      availableHours: 10,
      expectedWeeklyHoursWithDefault: 15,
      result: false
    },
    {
      availableHours: 0,
      expectedWeeklyHoursWithDefault: 0,
      result: true
    },
    {
      availableHours: null,
      expectedWeeklyHoursWithDefault: null,
      result: true
    }
  ])(
    'returns valid value',
    ({ availableHours, expectedWeeklyHoursWithDefault, result }) => {
      expect(
        isEngagementAvailable({
          availableHours,
          expectedWeeklyHoursWithDefault
        })
      ).toBe(result)
    }
  )
})
