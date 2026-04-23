import MockDate from 'mockdate'

import getStartOfCurrentDayDateTimeString from './get-start-of-current-day-date-time-string'

describe('#getStartOfCurrentDayDateTimeString', () => {
  it.each([
    {
      currentDate: '2022-01-01T02:00:00+05:00',
      timeZone: 'America/New_York',
      expectedDateTimeString: '2021-12-31T00:00:00-05:00'
    },
    {
      currentDate: '2021-12-31T19:00:00-05:00',
      timeZone: 'Europe/Moscow',
      expectedDateTimeString: '2022-01-01T00:00:00+03:00'
    },
    {
      currentDate: '2021-12-31T16:00:00-05:00',
      timeZone: 'Europe/Moscow',
      expectedDateTimeString: '2022-01-01T00:00:00+03:00'
    }
  ])(
    'returns date-time string for start of current day date',
    ({ currentDate, timeZone, expectedDateTimeString }) => {
      MockDate.set(currentDate)

      expect(
        getStartOfCurrentDayDateTimeString({
          timeZone
        })
      ).toBe(expectedDateTimeString)
    }
  )
})
