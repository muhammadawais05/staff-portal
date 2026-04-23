import { getHoursAndMinutesOfDay } from './get-hours-and-minutes-of-day'

describe('#getHoursAndMinutesOfDay', () => {
  describe('when the hourly interval is 2', () => {
    it('returns hourly interval of 2 values per hour', () => {
      expect(getHoursAndMinutesOfDay({ hourlyInterval: 2 })).toHaveLength(
        24 * 2
      )
      expect(getHoursAndMinutesOfDay({ hourlyInterval: 2 })).toEqual([
        {
          text: '12:00 AM',
          value: '00:00:00'
        },
        {
          text: '12:30 AM',
          value: '00:30:00'
        },
        {
          text: '1:00 AM',
          value: '01:00:00'
        },
        {
          text: '1:30 AM',
          value: '01:30:00'
        },
        {
          text: '2:00 AM',
          value: '02:00:00'
        },
        {
          text: '2:30 AM',
          value: '02:30:00'
        },
        {
          text: '3:00 AM',
          value: '03:00:00'
        },
        {
          text: '3:30 AM',
          value: '03:30:00'
        },
        {
          text: '4:00 AM',
          value: '04:00:00'
        },
        {
          text: '4:30 AM',
          value: '04:30:00'
        },
        {
          text: '5:00 AM',
          value: '05:00:00'
        },
        {
          text: '5:30 AM',
          value: '05:30:00'
        },
        {
          text: '6:00 AM',
          value: '06:00:00'
        },
        {
          text: '6:30 AM',
          value: '06:30:00'
        },
        {
          text: '7:00 AM',
          value: '07:00:00'
        },
        {
          text: '7:30 AM',
          value: '07:30:00'
        },
        {
          text: '8:00 AM',
          value: '08:00:00'
        },
        {
          text: '8:30 AM',
          value: '08:30:00'
        },
        {
          text: '9:00 AM',
          value: '09:00:00'
        },
        {
          text: '9:30 AM',
          value: '09:30:00'
        },
        {
          text: '10:00 AM',
          value: '10:00:00'
        },
        {
          text: '10:30 AM',
          value: '10:30:00'
        },
        {
          text: '11:00 AM',
          value: '11:00:00'
        },
        {
          text: '11:30 AM',
          value: '11:30:00'
        },
        {
          text: '12:00 PM',
          value: '12:00:00'
        },
        {
          text: '12:30 PM',
          value: '12:30:00'
        },
        {
          text: '1:00 PM',
          value: '13:00:00'
        },
        {
          text: '1:30 PM',
          value: '13:30:00'
        },
        {
          text: '2:00 PM',
          value: '14:00:00'
        },
        {
          text: '2:30 PM',
          value: '14:30:00'
        },
        {
          text: '3:00 PM',
          value: '15:00:00'
        },
        {
          text: '3:30 PM',
          value: '15:30:00'
        },
        {
          text: '4:00 PM',
          value: '16:00:00'
        },
        {
          text: '4:30 PM',
          value: '16:30:00'
        },
        {
          text: '5:00 PM',
          value: '17:00:00'
        },
        {
          text: '5:30 PM',
          value: '17:30:00'
        },
        {
          text: '6:00 PM',
          value: '18:00:00'
        },
        {
          text: '6:30 PM',
          value: '18:30:00'
        },
        {
          text: '7:00 PM',
          value: '19:00:00'
        },
        {
          text: '7:30 PM',
          value: '19:30:00'
        },
        {
          text: '8:00 PM',
          value: '20:00:00'
        },
        {
          text: '8:30 PM',
          value: '20:30:00'
        },
        {
          text: '9:00 PM',
          value: '21:00:00'
        },
        {
          text: '9:30 PM',
          value: '21:30:00'
        },
        {
          text: '10:00 PM',
          value: '22:00:00'
        },
        {
          text: '10:30 PM',
          value: '22:30:00'
        },
        {
          text: '11:00 PM',
          value: '23:00:00'
        },
        {
          text: '11:30 PM',
          value: '23:30:00'
        }
      ])
    })
  })

  describe('when the hourly interval is 4', () => {
    it('returns hourly interval of 4 values per hour', () => {
      expect(getHoursAndMinutesOfDay({ hourlyInterval: 4 })).toHaveLength(
        24 * 4
      )
    })
  })

  describe('with custom valueGetter', () => {
    it('returns the option with correctly generated value', () => {
      const valueGetter = (hour: number, minute: number) =>
        `Hour: ${hour} Minute: ${minute}`

      expect(
        getHoursAndMinutesOfDay({ hourlyInterval: 1, valueGetter })
      ).toEqual(
        expect.arrayContaining([
          { text: '12:00 AM', value: 'Hour: 0 Minute: 0' }
        ])
      )
    })
  })
})
