import { getISODateFromYearMonth } from '.'

describe('#getISODateFromYearMonth', () => {
  describe('when month is a single digit', () => {
    it('returns ISO 8601', () => {
      expect(getISODateFromYearMonth({ year: 2020, month: 9 })).toBe(
        '2020-09-01'
      )
    })
  })

  describe('when month is a double digit', () => {
    it('returns ISO 8601', () => {
      expect(getISODateFromYearMonth({ year: 2020, month: 12 })).toBe(
        '2020-12-01'
      )
    })
  })
})
