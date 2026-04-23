import { getFormattedDate, UNDEFINED_VALUE } from './get-formatted-date'

describe('Engagement detailed status utils', () => {
  describe('getDate', () => {
    it('returns expected date', () => {
      expect(getFormattedDate('2021-09-24T08:45:00-04:00')).toBe('Sep 24, 2021')
    })

    it('returns undefined value', () => {
      expect(getFormattedDate(undefined)).toBe(UNDEFINED_VALUE)
    })
  })

  describe('getTime', () => {
    it('returns expected time', () => {
      expect(getFormattedDate('2021-09-24T08:45:00-04:00', 'time')).toBe(
        '8:45 AM'
      )
    })

    it('returns undefined value', () => {
      expect(getFormattedDate(undefined)).toBe(UNDEFINED_VALUE)
    })
  })
})
