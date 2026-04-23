import { WeekDay } from '@staff-portal/graphql/staff'

import getBillDayOptions from './get-bill-day-options'

describe('getBillDayOptions', () => {
  it('returns bill day options', () => {
    expect(getBillDayOptions()).toEqual([
      {
        text: 'Sunday',
        value: WeekDay.SUNDAY
      },
      {
        text: 'Monday',
        value: WeekDay.MONDAY
      },
      {
        text: 'Tuesday',
        value: WeekDay.TUESDAY
      },
      {
        text: 'Wednesday',
        value: WeekDay.WEDNESDAY
      },
      {
        text: 'Thursday',
        value: WeekDay.THURSDAY
      },
      {
        text: 'Friday',
        value: WeekDay.FRIDAY
      },
      {
        text: 'Saturday',
        value: WeekDay.SATURDAY
      }
    ])
  })
})
