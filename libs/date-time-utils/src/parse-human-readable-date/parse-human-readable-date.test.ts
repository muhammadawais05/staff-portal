import MockDate from 'mockdate'

import parseHumanReadableDate from './parse-human-readable-date'

describe('parseHumanReadableDate', () => {
  beforeAll(() => {
    MockDate.set(new Date(2015, 0, 1))
  })

  describe('when value is human readable date string', () => {
    it('returns valid Date object', () => {
      expect(parseHumanReadableDate('in two days')).toEqual(
        new Date(2015, 0, 3, 0, 0, 0)
      )
    })
  })

  describe('when value is readable date string in `casual relative day` format', () => {
    it('returns valid Date object', () => {
      expect(parseHumanReadableDate('tomorrow')).toEqual(
        new Date(2015, 0, 2, 0, 0, 0)
      )
    })
  })

  describe('when value is invalid human readable date string', () => {
    it('returns null', () => {
      expect(parseHumanReadableDate('abc')).toBeNull()
    })
  })
})
