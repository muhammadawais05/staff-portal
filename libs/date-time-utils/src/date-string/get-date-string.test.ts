import MockDate from 'mockdate'

import getDateString from './get-date-string'

describe('#getDateString', () => {
  beforeAll(() => {
    MockDate.set('2022-01-01')
  })

  it('returns date string for given date', () => {
    expect(getDateString(new Date('2022-02-01'))).toBe('2022-02-01')
  })

  describe('When time zone is passed', () => {
    it('returns date-time string for given date', () => {
      expect(
        getDateString(new Date('2022-02-01'), {
          timeZone: 'America/New_York'
        })
      ).toBe('2022-01-31')
    })
  })

  describe('when date is invalid', () => {
    it('throws `Invalid time value` error', () => {
      expect(() => getDateString(new Date('invalid'))).toThrow(
        /Invalid time value/
      )
    })
  })
})
