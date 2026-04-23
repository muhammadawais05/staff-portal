import MockDate from 'mockdate'

import { getDifferenceInDaysFromNow } from './get-difference-in-days-from-now'

describe('#getDifferenceInDaysFromNow', () => {
  describe('returns 0', () => {
    it('when provided datetime has same date as current date', () => {
      MockDate.set('2020-04-07T10:20:30')

      expect(getDifferenceInDaysFromNow('2020-04-07T16:10:50')).toBe(0)
    })
  })

  describe('returns negative number', () => {
    it('when provided datetime is after current date', () => {
      MockDate.set('2020-04-07T10:20:30')

      expect(getDifferenceInDaysFromNow('2020-09-07T16:10:50')).toBeLessThan(0)
    })
  })

  describe('returns positive number', () => {
    it('when provided datetime is before current date', () => {
      MockDate.set('2020-04-07T10:20:30')

      expect(getDifferenceInDaysFromNow('2020-01-07T16:10:50')).toBeGreaterThan(
        0
      )
    })
  })
})
