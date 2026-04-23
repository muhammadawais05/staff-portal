import MockDate from 'mockdate'

import { parse, parseISOTime, parseJSDate, parseMillis } from '.'

describe('DateUtilsHelper Parsers', () => {
  beforeEach(() => MockDate.set('2019/01/01 19:00'))

  afterEach(() => MockDate.reset())

  describe('#parseISOTime', () => {
    it('return parsed date', () => {
      expect(parseISOTime('2016-08-21T16:44:11.754Z').toISO()).toBe(
        '2016-08-21T16:44:11.754+00:00'
      )
    })
  })

  describe('#parseJSDate', () => {
    it('return parsed date', () => {
      expect(parseJSDate(new Date()).toISO()).toBe(
        '2019-01-01T19:00:00.000+00:00'
      )
    })
  })

  describe('#parseMillis', () => {
    it('return parsed date', () => {
      expect(parseMillis(1548146060000).toISO()).toBe(
        '2019-01-22T08:34:20.000+00:00'
      )
    })
  })

  describe('#parse', () => {
    describe('when called wtesth ISO', () => {
      it('return parsed date', () => {
        expect(parse('2016-08-21T16:44:11.754Z').toISO()).toBe(
          '2016-08-21T16:44:11.754+00:00'
        )
      })
    })

    describe('when called wtesth JS Date', () => {
      it('return parsed date', () => {
        expect(parse(new Date()).toISO()).toBe('2019-01-01T19:00:00.000+00:00')
      })
    })
  })
})
