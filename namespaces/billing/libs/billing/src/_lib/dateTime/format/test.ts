import MockDate from 'mockdate'

import {
  formatDate,
  formatDateFull,
  formatDateLongMonthYear,
  formatDateMed,
  formatDateMedWithTime,
  formatDateParsed,
  formatDateRange,
  formatDateShort,
  formatDateShortDayName,
  formatDateURL,
  formatDistanceInWordsToNow,
  formatTime,
  formatTimeDisplay,
  formatTimeFromSeconds,
  formatTimeInWords,
  formatToKeepOriginalDate
} from '.'
import { parseISOTime } from '../parse'

const exampleNotThisYear = '2017-09-22T00:00:00.000Z'

describe('DateUtilsHelper Format', () => {
  beforeEach(() => MockDate.set('2019-01-01T19:00:00.000+00:00'))

  afterEach(() => MockDate.reset())

  describe('#formatDate', () => {
    describe('when year is current one', () => {
      it('returns formatted date', () => {
        expect(formatDate('2019-09-22T00:00:00.000Z')).toBe('Sep 22')
      })
    })

    describe('when year is not current one', () => {
      it('returns formatted date', () => {
        expect(formatDate(exampleNotThisYear)).toBe('Sep 22, 2017')
      })
    })
  })

  describe('#formatDateMed', () => {
    it('returns formatted date', () => {
      expect(formatDateMed('2019-09-22T00:00:00.000Z')).toBe('Sep 22, 2019')
    })
  })

  describe('#formatDateFull', () => {
    it('returns formatted date', () => {
      expect(formatDateFull('2019-09-22T00:00:00.000Z')).toBe(
        'September 22, 2019'
      )
    })
  })

  describe('#formatDateShort', () => {
    it('returns formatted date', () => {
      expect(formatDateShort('2019-09-22T00:00:00.000Z')).toBe('Sep 2019')
    })
  })

  describe('#formatDateMedWithTime', () => {
    it('returns formatted date', () => {
      expect(formatDateMedWithTime('2019-09-22T02:50:00.000Z')).toBe(
        'Sep 22, 2019 at 2:50am'
      )
    })
  })

  describe('#formatDateParsed', () => {
    describe('when year is current one', () => {
      it('returns formatted date', () => {
        expect(formatDateParsed(parseISOTime('2019-09-22T00:00:00.000Z'))).toBe(
          'Sep 22'
        )
      })

      describe('when argument `showYear` is true', () => {
        it('returns formatted date', () => {
          expect(
            formatDateParsed(parseISOTime('2019-09-22T00:00:00.000Z'), {
              showYear: true
            })
          ).toBe('Sep 22, 2019')
        })
      })
    })

    describe('when year is not current one', () => {
      it('returns formatted date', () => {
        expect(formatDateParsed(parseISOTime(exampleNotThisYear))).toBe(
          'Sep 22, 2017'
        )
      })

      describe('when argument `showYear` is false', () => {
        it('returns formatted date', () => {
          expect(
            formatDateParsed(parseISOTime(exampleNotThisYear), {
              showYear: false
            })
          ).toBe('Sep 22, 2017')
        })
      })
    })
  })

  describe('#formatDateShortDayName', () => {
    it('returns short week day name', () => {
      expect(formatDateShortDayName(exampleNotThisYear)).toBe('Fri')
    })
  })

  describe('#formatDateURL', () => {
    it('returns url date format', () => {
      expect(formatDateURL(exampleNotThisYear)).toBe('2017-09-22')
    })
  })

  describe('#formatDateLongMonthYear', () => {
    it('returns long month with year', () => {
      expect(formatDateLongMonthYear(exampleNotThisYear)).toBe('September 2017')
    })
  })

  describe('#formatDateRange', () => {
    let endDate, startDate

    describe('when dates are the same', () => {
      describe('when the dates are in the past', () => {
        it('returns formatted date', () => {
          startDate = new Date(2014, 1, 20)
          endDate = new Date(2014, 1, 20)

          expect(formatDateRange({ end: endDate, start: startDate })).toBe(
            'Feb 20, 2014'
          )
        })
      })

      describe('when date is in the current year', () => {
        it('returns formatted date', () => {
          startDate = new Date()
          endDate = new Date()

          expect(formatDateRange({ end: endDate, start: startDate })).toBe(
            'Jan 1'
          )
        })
      })
    })

    describe('when dates are different', () => {
      describe('when dates are in the same year', () => {
        describe('when dates are in the same month', () => {
          describe('when the years are in the past', () => {
            it('returns formatted date', () => {
              startDate = new Date(2014, 1, 20)
              endDate = new Date(2014, 1, 21)

              expect(formatDateRange({ end: endDate, start: startDate })).toBe(
                'Feb 20 — 21, 2014'
              )
            })
          })

          describe('when date is in the current year', () => {
            it('returns formatted date', () => {
              startDate = new Date(2019, 1, 15)
              endDate = new Date(2019, 1, 20)

              expect(formatDateRange({ end: endDate, start: startDate })).toBe(
                'Feb 15 — 20'
              )
            })
          })
        })

        describe('when dates are in the different month', () => {
          describe('when the years are in the past', () => {
            it('returns formatted date', () => {
              startDate = new Date(2014, 2, 20)
              endDate = new Date(2014, 5, 21)

              expect(formatDateRange({ end: endDate, start: startDate })).toBe(
                'Mar 20 — Jun 21, 2014'
              )
            })
          })

          describe('when date is in the current year', () => {
            it('returns formatted date', () => {
              startDate = '2019-01-01'
              endDate = '2019-03-01'

              expect(formatDateRange({ end: endDate, start: startDate })).toBe(
                'Jan 1 — Mar 1'
              )
            })
          })
        })
      })

      describe('when dates are in different years', () => {
        describe('when the years are in the past', () => {
          it('returns formatted date', () => {
            startDate = '2016-01-01'
            endDate = '2017-03-01'

            expect(formatDateRange({ end: endDate, start: startDate })).toBe(
              'Jan 1, 2016 — Mar 1, 2017'
            )
          })
        })

        describe('when date is in the current year', () => {
          it('returns formatted date', () => {
            startDate = '2018-01-01'
            endDate = '2019-03-01'

            expect(formatDateRange({ end: endDate, start: startDate })).toBe(
              'Jan 1, 2018 — Mar 1'
            )
          })
        })
      })
    })
  })

  describe('#formatTime', () => {
    it('return formatted time', () => {
      expect(formatTime(new Date(2014, 1, 20, 2, 50))).toBe('2:50am')
    })
  })

  describe('#formatTimeDisplay', () => {
    it('return formatted time', () => {
      expect(formatTimeDisplay(new Date(2014, 1, 20, 2, 50))).toBe('02:50')
    })
  })

  describe('#formatTimeFromSeconds', () => {
    describe('when called wtesth `0`', () => {
      it('return formatted time', () => {
        expect(formatTimeFromSeconds(0)).toBe('00:00')
      })

      describe('when called wtesth default value', () => {
        it('return formatted time', () => {
          expect(formatTimeFromSeconds(0, { defaultValue: '—' })).toBe('—')
        })
      })
    })

    describe('when called wtesth less than `60`', () => {
      it('return formatted time', () => {
        expect(formatTimeFromSeconds(45)).toBe('45 secs')
      })
    })

    describe('when called wtesth over `60`', () => {
      it('return formatted time', () => {
        expect(formatTimeFromSeconds(1224567)).toBe('340:09')
      })
    })
  })

  describe('#formatTimeInWords', () => {
    describe('when if seconds is `0`', () => {
      it('return formatted time', () => {
        expect(formatTimeInWords({ seconds: 0 })).toBe('—')
      })
    })

    describe('when seconds has value', () => {
      describe('when hours and minutes', () => {
        describe('when options abr is `false`', () => {
          it('return formatted time', () => {
            expect(formatTimeInWords({ seconds: 5000 })).toBe(
              '1 hour 23 minutes'
            )
          })

          describe('when seconds equals to multiple hours', () => {
            it('return formatted time', () => {
              expect(formatTimeInWords({ seconds: 28799 })).toBe(
                '7 hours 59 minutes'
              )
            })
          })

          describe('when seconds is a whole hour', () => {
            it('return formatted time', () => {
              expect(formatTimeInWords({ seconds: 7200 })).toBe('2 hours')
            })
          })
        })

        describe('when options abr is `true`', () => {
          it('return formatted time', () => {
            expect(
              formatTimeInWords({ options: { abbr: true }, seconds: 5000 })
            ).toBe('1 h 23 m')
          })
        })
      })

      describe('when has minutes only', () => {
        it('return formatted time', () => {
          expect(formatTimeInWords({ seconds: 1200 })).toBe('20 minutes')
        })
      })
    })
  })

  describe('#formatDistanceInWordsToNow', () => {
    describe('years', () => {
      describe('when the difference over year', () => {
        it('returns formatted duration', () => {
          expect(formatDistanceInWordsToNow('2017-05-22T00:00:00.000Z')).toBe(
            'over 1 year ago'
          )
        })
      })

      describe('when the difference almost 2 year', () => {
        it('returns formatted duration', () => {
          expect(
            formatDistanceInWordsToNow('2018-01-01T18:25:00.000+00:00')
          ).toBe('1 year ago')
        })
      })

      describe('when the difference about 1 year', () => {
        it('returns formatted duration', () => {
          expect(formatDistanceInWordsToNow('2017-10-22T00:00:00.000Z')).toBe(
            'about 1 year ago'
          )
        })
      })
    })

    describe('months', () => {
      describe('when the difference over 2 months', () => {
        it('returns formatted duration', () => {
          expect(formatDistanceInWordsToNow('2018-10-22T00:00:00.000Z')).toBe(
            'over 2 months ago'
          )
        })
      })

      describe('when the difference almost 7 months', () => {
        it('returns formatted duration', () => {
          expect(
            formatDistanceInWordsToNow('2018-07-01T18:25:00.000+00:00')
          ).toBe('6 months ago')
        })
      })
    })

    describe('weeks', () => {
      describe('when the difference over 1 week', () => {
        it('returns formatted duration', () => {
          expect(formatDistanceInWordsToNow('2018-12-21')).toBe(
            'over 1 week ago'
          )
        })
      })

      describe('when the difference almost 2 week', () => {
        it('returns formatted duration', () => {
          expect(formatDistanceInWordsToNow('2018-12-25')).toBe('1 week ago')
        })
      })

      describe('when the difference over 2 weeks', () => {
        it('returns formatted duration', () => {
          expect(formatDistanceInWordsToNow('2018-12-15')).toBe(
            'over 2 weeks ago'
          )
        })
      })

      describe('when the difference about 3 weeks', () => {
        it('returns formatted duration', () => {
          expect(formatDistanceInWordsToNow('2018-12-10')).toBe(
            'about 3 weeks ago'
          )
        })
      })
    })

    describe('days', () => {
      describe('when the difference over 1 day', () => {
        it('returns formatted duration', () => {
          expect(formatDistanceInWordsToNow('2018-12-31')).toBe(
            'over 1 day ago'
          )
        })
      })

      describe('when the difference almost 5 days', () => {
        it('returns formatted duration', () => {
          expect(
            formatDistanceInWordsToNow('2018-12-28T18:25:00.000+00:00')
          ).toBe('4 days ago')
        })
      })

      describe('when the difference about 3 days', () => {
        it('returns formatted duration', () => {
          expect(
            formatDistanceInWordsToNow('2018-12-28T10:00:00.000+00:00')
          ).toBe('about 4 days ago')
        })
      })
    })

    describe('hours', () => {
      describe('when the difference about 1 hour', () => {
        it('returns formatted duration', () => {
          expect(
            formatDistanceInWordsToNow('2019-01-01T17:45:59.000+00:00')
          ).toBe('about 1 hour ago')
        })
      })

      describe('when the difference over 1 hour', () => {
        it('returns formatted duration', () => {
          expect(
            formatDistanceInWordsToNow('2019-01-01T17:25:59.000+00:00')
          ).toBe('over 1 hour ago')
        })
      })

      describe('when the difference almost 2 hour', () => {
        it('returns formatted duration', () => {
          expect(
            formatDistanceInWordsToNow('2019-01-01T17:59:59.000+00:00')
          ).toBe('1 hour ago')
        })
      })
    })

    describe('minutes', () => {
      describe('when the difference almost 51 minutes', () => {
        it('returns formatted duration', () => {
          expect(
            formatDistanceInWordsToNow('2019-01-01T18:10:00.000+00:00')
          ).toBe('50 minutes ago')
        })
      })

      describe('when the difference about 4 minutes', () => {
        it('returns formatted duration', () => {
          expect(
            formatDistanceInWordsToNow('2019-01-01T18:55:59.000+00:00')
          ).toBe('about 4 minutes ago')
        })
      })

      describe('when the difference over 35 minutes', () => {
        it('returns formatted duration', () => {
          expect(
            formatDistanceInWordsToNow('2019-01-01T18:25:00.000+00:00')
          ).toBe('35 minutes ago')
        })
      })

      describe('when the difference less than a minute', () => {
        it('returns formatted duration', () => {
          expect(formatDistanceInWordsToNow('2019/01/01 19:00')).toBe(
            'less than a minute ago'
          )
        })
      })
    })
  })

  // TODO:
  // In jest TZ passing very limited, if the original issue won't be fixed, multi TZ test need to be applied here
  describe('#formatToKeepOriginalDate', () => {
    it('returns formatted duration', () => {
      expect(formatToKeepOriginalDate(new Date('2020-05-15'))).toBe(
        '2020-05-15'
      )
    })
  })
})
