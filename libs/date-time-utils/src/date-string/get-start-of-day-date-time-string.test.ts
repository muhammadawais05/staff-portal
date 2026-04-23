import { Scalars } from '@staff-portal/graphql/staff'

import getStartOfDayDateTimeString from './get-start-of-day-date-time-string'

describe('#getStartOfDayDateTimeString', () => {
  it.each([
    {
      currentDateTimeString: '2022-01-01T00:00:00+05:00',
      expectedDateTimeString: '2022-01-01T00:00:00+05:00'
    },
    {
      currentDateTimeString: '2022-01-01T02:00:00+05:00',
      expectedDateTimeString: '2022-01-01T00:00:00+05:00'
    },
    {
      currentDateTimeString: '2021-12-31T19:00:00-05:00',
      expectedDateTimeString: '2021-12-31T00:00:00-05:00'
    },
    {
      currentDateTimeString: '2021-12-31T19:00:00',
      expectedDateTimeString: '2021-12-31T00:00:00'
    },
    {
      currentDateTimeString: '2022-01-01' as Scalars['Time'],
      expectedDateTimeString: '2022-01-01'
    }
  ] as const)(
    'returns start of the day date-time string for passed day-time string',
    ({ currentDateTimeString, expectedDateTimeString }) => {
      expect(getStartOfDayDateTimeString(currentDateTimeString)).toBe(
        expectedDateTimeString
      )
    }
  )
})
