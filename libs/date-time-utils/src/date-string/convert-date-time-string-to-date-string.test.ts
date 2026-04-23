import { Scalars } from '@staff-portal/graphql/staff'

import convertDateTimeStringToDateString from './convert-date-time-string-to-date-string'

describe('#convertDateTimeStringToDateString', () => {
  it.each([
    '2022-06-15T15:12:10+03:00',
    '2022-06-15' as Scalars['Time']
  ] as const)('converts date-time string to date string', dateTimeString => {
    expect(convertDateTimeStringToDateString(dateTimeString)).toBe('2022-06-15')
  })
})
