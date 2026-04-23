import { NO_VALUE } from '@staff-portal/config'

import getTimeZoneFullText from './get-time-zone-full-text'

describe('getTimeZoneText', () => {
  it('returns time zone in proper format', () => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2021-11-15T10:30:00+02:00'))

    expect(
      getTimeZoneFullText({
        name: '(UTC+05:00) Asia - Dushanbe',
        value: 'Asia/Dushanbe'
      })
    ).toBe('(UTC+05:00) Asia - Dushanbe, now 1:30 PM')

    jest.useRealTimers()
  })

  describe('when time zone is not passed', () => {
    it('returns no value placeholder', () => {
      expect(getTimeZoneFullText()).toEqual(NO_VALUE)
    })
  })
})
