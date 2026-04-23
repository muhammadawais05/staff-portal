import getRequiredJobHours from './get-required-job-hours'

describe('getRequiredJobHours', () => {
  describe('when the commitment is missing', () => {
    it('returns undefined', () => {
      expect(getRequiredJobHours({})).toBeUndefined()
      expect(getRequiredJobHours({ expectedWeeklyHours: 1 })).toBeUndefined()
    })
  })

  describe('when the commitment is hourly', () => {
    describe('when expected weekly hours is missing', () => {
      it('returns default hourly commitment', () => {
        const COMMITMENT = 'hourly'

        expect(getRequiredJobHours({ commitment: COMMITMENT })).toBe(5)
      })
    })

    describe('when expected weekly hours is passed', () => {
      it('returns expected weekly hours', () => {
        const COMMITMENT = 'hourly'

        expect(
          getRequiredJobHours({
            commitment: COMMITMENT,
            expectedWeeklyHours: 10
          })
        ).toBe(10)
      })
    })
  })

  describe('when the commitment is not hourly', () => {
    it.each([
      ['part_time', 20],
      ['full_time', 40]
    ])('returns specific hours', (commitment, expected) => {
      expect(getRequiredJobHours({ commitment })).toBe(expected)
    })
  })
})
