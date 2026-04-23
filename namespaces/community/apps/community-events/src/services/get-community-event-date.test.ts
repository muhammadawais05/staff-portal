import { getCommunityEventFullDate } from './get-community-event-date'

describe('Get community event full date', () => {
  it.each([
    ['2022-03-25', '14:00:00', 'Mar 25, 2022 at 2:00 PM'],
    ['2021-01-10', '09:30:00', 'Jan 10, 2021 at 9:30 AM'],
    ['2022-02-15', '', 'Feb 15, 2022'],
    ['', '14:00:00', null]
  ])(
    'returns full event date for date "%s" and time "%s"',
    (date, time, expected) => {
      const fullDate = getCommunityEventFullDate(date, time)

      expect(fullDate).toEqual(expected)
    }
  )
})
