import MockDate from 'mockdate'

import getDateTimeString from './get-date-time-string'

describe('#getDateTimeString', () => {
  beforeAll(() => {
    MockDate.set('2022-01-01T02:00:00+05:00')
  })

  it('returns date-time string for given date', () => {
    expect(
      getDateTimeString(new Date('2022-02-01T15:00:00-05:00'), {
        timeZone: 'America/New_York'
      })
    ).toBe('2022-02-01T15:00:00-05:00')
  })

  describe('when date is invalid', () => {
    it('throws `Invalid time value` error', () => {
      expect(() =>
        getDateTimeString(new Date('invalid'), {
          timeZone: 'America/New_York'
        })
      ).toThrow(/Invalid time value/)
    })
  })
})
