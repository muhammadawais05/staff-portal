import { BillCycle, JobCommitment, WeekDay } from '@staff-portal/graphql/staff'

import adjustValues from './adjustValues'

describe('#adjustValues', () => {
  describe('when form values are set', () => {
    it('returns non-null values', () => {
      const jobTemplate = {
        billCycle: BillCycle.BI_WEEKLY,
        billDay: WeekDay.MONDAY,
        commitment: JobCommitment.HOURLY
      }

      expect(adjustValues(jobTemplate)).toEqual(jobTemplate)
    })
  })

  describe('when form values are not set', () => {
    it('returns null values', () => {
      expect(adjustValues({})).toEqual({
        billCycle: null,
        billDay: null,
        commitment: null
      })
    })
  })
})
