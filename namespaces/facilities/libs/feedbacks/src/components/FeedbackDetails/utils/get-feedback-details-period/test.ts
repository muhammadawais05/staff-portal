import { getFeedbackDetailsPeriod } from '.'

describe('getFeedbackDetailsPeriod', () => {
  describe('when all target fields are `null`', () => {
    it('returns NO_VALUE', () => {
      const period = getFeedbackDetailsPeriod({
        targetPeriodSingleDay: null,
        targetPeriodStartDate: null,
        targetPeriodEndDate: null
      })

      expect(period).toBe('—')
    })
  })

  describe("when it's single day type", () => {
    it('returns formatted startDate', () => {
      const period = getFeedbackDetailsPeriod({
        targetPeriodSingleDay: true,
        targetPeriodStartDate: '2020-07-07',
        targetPeriodEndDate: null
      })

      expect(period).toBe('On Jul 7, 2020')
    })
  })

  describe("when it's multi day type & start and end date exist", () => {
    it('returns formatted dates', () => {
      const period = getFeedbackDetailsPeriod({
        targetPeriodSingleDay: false,
        targetPeriodStartDate: '2020-07-07',
        targetPeriodEndDate: '2020-07-09'
      })

      expect(period).toBe('Jul 7, 2020 - Jul 9, 2020')
    })
  })

  describe("when it's multi day type & only start date exists", () => {
    it('returns formatted start date', () => {
      const period = getFeedbackDetailsPeriod({
        targetPeriodSingleDay: false,
        targetPeriodStartDate: '2020-07-07',
        targetPeriodEndDate: null
      })

      expect(period).toBe('From Jul 7, 2020')
    })
  })
})
