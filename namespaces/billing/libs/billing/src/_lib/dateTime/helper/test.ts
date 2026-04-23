import { Settings } from 'luxon'
import MockDate from 'mockdate'

import {
  MaxPastDate,
  TimePeriod,
  getCurrentTime,
  getCurrentLocalTime,
  getDayNameForDate,
  getDayNamesOfWeek,
  getDifferenceInDays,
  getDifferenceInMinutes,
  getDifferenceInSeconds,
  getDueDays,
  getEachDayOfInterval,
  getEachStartDayOfWeeks,
  getHoursMinutes,
  getISODay,
  getMinutes,
  getOneMonthAgoDate,
  getStartDateForPeriod,
  getTimeZone,
  getWeekends,
  isAfter,
  isBefore,
  isCurrentDay,
  isCurrentMonth,
  isCurrentYear,
  isFutureDate,
  isIntervalContains,
  isSameDay,
  isSameMonth,
  isSameYear,
  isValid,
  isWeekend,
  getCurrentDayAsJSDate
} from '.'

describe('DateUtilsHelper Helpers', () => {
  beforeEach(() => MockDate.set('2019/01/01 19:00'))

  afterEach(() => {
    MockDate.reset()
    Settings.defaultZoneName = 'local'
  })

  describe('#getCurrentTime', () => {
    it('returns current time', () => {
      expect(getCurrentTime().toISO()).toBe('2019-01-01T19:00:00.000+00:00')
    })
  })

  describe('#getCurrentLocalTime', () => {
    beforeEach(() => {
      Settings.defaultZoneName = 'America/New_York'
    })

    it('returns current time with timezone using `getCurrentTime` helper', () => {
      // test `getCurrentTime` just to show the difference between these two helpers
      expect(getCurrentTime().toISO()).toBe('2019-01-01T14:00:00.000-05:00')
    })

    it('returns current local time', () => {
      expect(getCurrentLocalTime().toISO()).toBe('2019-01-01T19:00:00.000Z')
    })
  })

  describe('#getTimeZone', () => {
    it('returns TimeZone name', () => {
      expect(getTimeZone()).toBe('UTC')
    })
  })

  describe('#getDayNameForDate', () => {
    it('returns long week day name', () => {
      expect(getDayNameForDate('2019-01-01')).toBe('Tuesday')
    })
  })

  describe('#getDayNamesOfWeek', () => {
    describe('when `startAt` is sunday', () => {
      it('returns WeekNames array', () => {
        expect(getDayNamesOfWeek({ weekStartsOn: 7 })).toEqual([
          'Sun',
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat'
        ])
      })
    })

    describe('when `startAt` is monday', () => {
      it('returns WeekNames array', () => {
        expect(getDayNamesOfWeek({ weekStartsOn: 1 })).toEqual([
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat',
          'Sun'
        ])
      })
    })
  })

  describe('#getDifferenceInDays', () => {
    it.each`
      end             | start           | diff | message
      ${'2019-01-24'} | ${'2019-01-21'} | ${3} | ${'returns proper difference when end date is later'}
      ${'2019-01-19'} | ${'2019-01-21'} | ${0} | ${'returns zero difference when end date is earlier'}
      ${'2019-01-21'} | ${'2019-01-21'} | ${0} | ${'returns zero difference when end date is the same'}
    `('$message', ({ end, start, diff }) => {
      expect(getDifferenceInDays({ end, start })).toBe(diff)
    })
  })

  describe('#getDifferenceInSeconds', () => {
    const dateStart = new Date(2014, 1, 20, 2, 50)
    const dateEnd = new Date(2014, 1, 20, 4, 55)

    describe('when difference seconds is proper', () => {
      it('returns difference in days', () => {
        expect(getDifferenceInSeconds({ end: dateEnd, start: dateStart })).toBe(
          7500
        )
      })
    })

    describe('when end date is earlier', () => {
      it('returns difference in days', () => {
        expect(getDifferenceInSeconds({ end: dateStart, start: dateEnd })).toBe(
          0
        )
      })
    })
  })

  describe('#getDueDays', () => {
    describe('when difference days is proper', () => {
      it('returns difference in days', () => {
        expect(getDueDays('2018-12-20')).toBe(12)
      })
    })

    describe('when end date is earlier', () => {
      it('returns difference in days', () => {
        expect(getDueDays('2019-01-19')).toBe(0)
      })
    })
  })

  describe('#isCurrentYear', () => {
    describe('when date is the same year', () => {
      it('returns boolean', () => {
        expect(isCurrentYear('2019-06-26')).toBe(true)
      })
    })

    describe('when date is not the same year', () => {
      it('returns boolean', () => {
        expect(isCurrentYear('2018-06-26')).toBe(false)
      })
    })
  })

  describe('#isSameYear', () => {
    describe('when date is the same year', () => {
      it('returns boolean', () => {
        expect(isSameYear({ end: '2019-02-26', start: '2019-06-26' })).toBe(
          true
        )
      })
    })

    describe('when date is not the same year', () => {
      it('returns boolean', () => {
        expect(isSameYear({ end: '2018-02-26', start: '2019-06-26' })).toBe(
          false
        )
      })
    })
  })

  describe('#isCurrentMonth', () => {
    describe('when date is the same month', () => {
      it('returns boolean', () => {
        expect(isCurrentMonth('2019-01-25')).toBe(true)
      })
    })

    describe('when date is not the same month', () => {
      it('returns boolean', () => {
        expect(isCurrentMonth('2019-02-21')).toBe(false)
      })
    })
  })

  describe('#isSameMonth', () => {
    describe('when date is the same month', () => {
      it('returns boolean', () => {
        expect(isSameMonth({ end: '2019-06-26', start: '2019-06-26' })).toBe(
          true
        )
      })
    })

    describe('when date is not the same month', () => {
      it('returns boolean', () => {
        expect(isSameMonth({ end: '2019-07-26', start: '2019-06-26' })).toBe(
          false
        )
      })
    })
  })

  describe('#isCurrentDay', () => {
    describe('when date is the same day', () => {
      it('returns boolean', () => {
        expect(isCurrentDay('2019-01-01')).toBe(true)
      })
    })

    describe('when date is not the same day', () => {
      it('returns boolean', () => {
        expect(isCurrentDay('2019-01-02')).toBe(false)
      })
    })
  })

  describe('#isSameDay', () => {
    it.each`
      end             | start           | expected | message
      ${'2019-01-24'} | ${'2019-01-01'} | ${false} | ${'returns `false` when date is later'}
      ${'2018-01-24'} | ${'2019-01-01'} | ${false} | ${'returns `false` when date is earlier'}
      ${'2019-01-01'} | ${'2019-01-01'} | ${true}  | ${'returns `true` when date is the same'}
    `('$message', ({ end, start, expected }) => {
      expect(isSameDay({ end, start })).toBe(expected)
    })
  })

  describe('#isFutureDate', () => {
    describe('when date is now', () => {
      it('returns boolean', () => {
        expect(isFutureDate('2019-01-01')).toBe(false)
      })
    })

    describe('when date is in the future', () => {
      it('returns boolean', () => {
        expect(isFutureDate('2019-01-02')).toBe(true)
      })
    })
  })

  describe('#isAfter', () => {
    it.each`
      end             | start           | expected | message
      ${'2019-01-24'} | ${'2019-01-01'} | ${true}  | ${'returns `true` when end date is later'}
      ${'2018-01-24'} | ${'2019-01-01'} | ${false} | ${'returns `false` when end date is earlier'}
      ${'2019-01-01'} | ${'2019-01-01'} | ${false} | ${'returns `false` when end date is the same'}
    `('$message', ({ end, start, expected }) => {
      expect(isAfter({ end, start })).toBe(expected)
    })
  })

  describe('#isBefore', () => {
    describe('when date is before', () => {
      it('returns boolean', () => {
        expect(isBefore({ end: '2018-12-24', start: '2019-01-01' })).toBe(true)
      })
    })

    describe('when date is after', () => {
      it('returns boolean', () => {
        expect(isBefore({ end: '2019-01-02', start: '2019-01-01' })).toBe(false)
      })
    })
  })

  describe('#getEachDayOfInterval', () => {
    it('returns array of ISO dates', () => {
      expect(
        getEachDayOfInterval({ end: '2019-05-05', start: '2019-04-22' })
      ).toEqual([
        '2019-04-22',
        '2019-04-23',
        '2019-04-24',
        '2019-04-25',
        '2019-04-26',
        '2019-04-27',
        '2019-04-28',
        '2019-04-29',
        '2019-04-30',
        '2019-05-01',
        '2019-05-02',
        '2019-05-03',
        '2019-05-04',
        '2019-05-05'
      ])
    })
  })

  describe('#getEachStartDayOfWeeks', () => {
    describe('when `weekStartsOn` is `1`', () => {
      it('returns array of ISO dates, with multiple dates', () => {
        expect(
          getEachStartDayOfWeeks({
            end: '2019-05-05',
            start: '2019-04-22',
            weekStartsOn: 1
          })
        ).toEqual(['2019-04-22', '2019-04-29'])
      })

      it('returns array of ISO dates, with a single iso date', () => {
        expect(
          getEachStartDayOfWeeks({
            end: '2019-03-09',
            start: '2019-03-07',
            weekStartsOn: 1
          })
        ).toEqual(['2019-03-04'])
      })
    })

    describe('when `weekStartsOn` is `7`', () => {
      it('returns array of ISO dates, with multiple dates', () => {
        expect(
          getEachStartDayOfWeeks({
            end: '2019-05-05',
            start: '2019-04-22',
            weekStartsOn: 7
          })
        ).toEqual(['2019-04-21', '2019-04-28', '2019-05-05'])
      })

      it('returns array of ISO dates, with a single iso date', () => {
        expect(
          getEachStartDayOfWeeks({
            end: '2019-03-09',
            start: '2019-03-07',
            weekStartsOn: 7
          })
        ).toEqual(['2019-03-03'])
      })
    })
  })

  describe('#isIntervalContains', () => {
    describe('when date is on the edge', () => {
      describe('when date is the same date as start', () => {
        it('return true', () => {
          expect(
            isIntervalContains({
              date: '2019-04-22',
              end: '2019-05-05',
              start: '2019-04-22'
            })
          ).toBe(true)
        })
      })

      describe('when date is the same date as end', () => {
        it('returns true', () => {
          expect(
            isIntervalContains({
              date: '2019-05-05',
              end: '2019-05-05',
              start: '2019-04-22'
            })
          ).toBe(true)
        })
      })
    })

    describe('when date is out of the range', () => {
      it('returns false', () => {
        expect(
          isIntervalContains({
            date: '2019-05-06',
            end: '2019-05-05',
            start: '2019-04-22'
          })
        ).toBe(false)
      })
    })
  })

  describe('#getDifferenceInMinutes', () => {
    it('returns minutes', () => {
      expect(
        getDifferenceInMinutes({
          end: '2019-01-01T23:00:00.000+03:00',
          start: '2019-01-01T19:45:00.000+00:00'
        })
      ).toBe(15)
    })

    it('returns `0`', () => {
      expect(
        getDifferenceInMinutes({
          end: '2019-01-01T19:45:00.000+00:00',
          start: '2019-01-01T23:00:00.000+03:00'
        })
      ).toBe(0)
    })
  })

  describe('#getWeekends', () => {
    describe('when version is defined', () => {
      it('returns array of weekend strings', () => {
        expect(getWeekends({ version: 'short' })).toEqual(['Sat', 'Sun'])
      })
    })

    describe('when no options passed', () => {
      it('returns array of weekend strings', () => {
        expect(getWeekends({})).toEqual(['Sat', 'Sun'])
      })
    })
  })

  describe('#isWeekend', () => {
    it('returns `true`', () => {
      expect(
        isWeekend({
          date: '2019-01-01T19:45:00.000+00:00'
        })
      ).toBe(false)
    })
  })

  describe('#isValid', () => {
    it('returns `true`', () => {
      expect(isValid('2019-01-01T19:45:00.000+00:00')).toBe(true)
    })

    it('returns `false`', () => {
      expect(isValid('2019-02-31T19:45:00.000+00:00')).toBe(false)
    })
  })

  describe('#getISODay', () => {
    it('returns date', () => {
      expect(getISODay('2018-06-16', 10)).toBe('2018-06-26')
    })
  })

  describe('#getMinutes', () => {
    it('returns date', () => {
      expect(getMinutes({ hours: 14, minutes: 115 })).toBe(955)
    })
  })

  describe('#getHoursMinutes', () => {
    describe('when its more than a hour', () => {
      it('returns time and minutes', () => {
        expect(getHoursMinutes({ hours: 14, minutes: 115 })).toEqual({
          hours: 15,
          minutes: 55
        })
      })
    })

    it('returns time and minutes', () => {
      expect(getHoursMinutes({ minutes: 60 })).toEqual({
        hours: 1,
        minutes: 0
      })
    })

    describe('#getStartDateForPeriod', () => {
      describe('For `quarter` period', () => {
        it('returns proper start date', () => {
          MockDate.set('2019/06/15')

          expect(getStartDateForPeriod(TimePeriod.Quarter).toISO()).toBe(
            '2019-04-01T00:00:00.000+00:00'
          )

          MockDate.reset()
        })
      })

      describe('For `year` period', () => {
        it('returns proper start date', () => {
          MockDate.set('2019/08/21')

          expect(getStartDateForPeriod(TimePeriod.Year).toISO()).toBe(
            '2019-01-01T00:00:00.000+00:00'
          )

          MockDate.reset()
        })
      })

      describe('For `all` period', () => {
        it('returns proper start date', () => {
          MockDate.set('2019/08/21')

          expect(getStartDateForPeriod(TimePeriod.All).toISO()).toBe(
            MaxPastDate.toISO()
          )

          MockDate.reset()
        })
      })
    })
  })

  describe('#getOneMonthAgoDate', () => {
    it('returns the ISO date of one month ago', () => {
      expect(getOneMonthAgoDate()).toBe('2018-12-01')
    })
  })

  describe('#getCurrentDay', () => {
    MockDate.reset()

    afterAll(MockDate.reset)

    it.each`
      setDate                                                                                   | expected
      ${() => MockDate.set('Wed Jan 13 2021 00:30:00 GMT+0300 (Eastern European Summer Time)')} | ${new Date('2021-01-12T00:00:00.000Z')}
      ${() => MockDate.set('Wed Jan 13 2021 02:00:00 GMT+0300 (Eastern European Summer Time)')} | ${new Date('2021-01-12T00:00:00.000Z')}
      ${() => MockDate.set('Wed Jan 13 2021 05:00:00 GMT+0300 (Eastern European Summer Time)')} | ${new Date('2021-01-12T00:00:00.000Z')}
      ${() => MockDate.set('Wed Jan 13 2021 23:59:59 GMT+0300 (Eastern European Summer Time)')} | ${new Date('2021-01-13T00:00:00.000Z')}
      ${() => MockDate.set('Wed Jan 13 2021 00:00:01 GMT+0300 (Eastern European Summer Time)')} | ${new Date('2021-01-12T00:00:00.000Z')}
      ${() => MockDate.set('Wed Jan 13 2021 00:00:00 GMT+0300 (Eastern European Summer Time)')} | ${new Date('2021-01-12T00:00:00.000Z')}
      ${() => MockDate.set('Wed Jan 13 2021 15:00:00 GMT+0300 (Eastern European Summer Time)')} | ${new Date('2021-01-13T00:00:00.000Z')}
    `('Returns the correct day', ({ expected, setDate }) => {
      Settings.defaultZoneName = 'America/New_York'

      setDate()

      expect(new Date(getCurrentDayAsJSDate())).toEqual(expected)
    })
  })
})
