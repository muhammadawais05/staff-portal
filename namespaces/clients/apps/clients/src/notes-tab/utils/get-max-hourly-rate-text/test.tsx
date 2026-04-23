import { JobBudgetDetails } from '@staff-portal/graphql/staff'

import getMaxHourlyRateText from './get-max-hourly-rate-text'

describe('getMaxHourlyRateText', () => {
  describe('when budget details and maximum hourly rate value are empty', () => {
    it('returns null', () => {
      const text = getMaxHourlyRateText({
        budgetDetails: null,
        maxHourlyRate: null
      })

      expect(text).toBeNull()
    })
  })

  describe('when budget details is `RATE_SPECIFIED`', () => {
    describe('when maximum hourly rate is specified', () => {
      it('returns rate value', () => {
        const text = getMaxHourlyRateText({
          budgetDetails: JobBudgetDetails.RATE_SPECIFIED,
          maxHourlyRate: 5
        })

        expect(text).toBe('$5.00/hour')
      })
    })

    describe('when maximum hourly rate is empty', () => {
      it('returns null', () => {
        const text = getMaxHourlyRateText({
          budgetDetails: JobBudgetDetails.RATE_SPECIFIED,
          maxHourlyRate: null
        })

        expect(text).toBeNull()
      })
    })
  })

  describe('when budget details is `NO_RATE_LIMIT`', () => {
    it('returns `No rate limit` text', () => {
      const text = getMaxHourlyRateText({
        budgetDetails: JobBudgetDetails.NO_RATE_LIMIT,
        maxHourlyRate: null
      })

      expect(text).toBe('No rate limit')
    })
  })

  describe('when budget details are specified', () => {
    it('returns budget details text', () => {
      const text = getMaxHourlyRateText({
        budgetDetails: JobBudgetDetails.UNCERTAIN_OF_BUDGET,
        maxHourlyRate: null
      })

      expect(text).toBe('Budget still uncertain')
    })
  })
})
