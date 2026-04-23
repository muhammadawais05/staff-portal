import MockDate from 'mockdate'

import getCurrentDateString from './get-current-date-string'

describe('#getDateString', () => {
  beforeAll(() => {
    MockDate.set('2022-01-01')
  })

  it('returns date string for current date', () => {
    expect(getCurrentDateString()).toBe('2022-01-01')
  })

  describe('When time zone is passed', () => {
    it('returns date-time string for current date', () => {
      expect(
        getCurrentDateString({
          timeZone: 'America/New_York'
        })
      ).toBe('2021-12-31')
    })
  })
})
