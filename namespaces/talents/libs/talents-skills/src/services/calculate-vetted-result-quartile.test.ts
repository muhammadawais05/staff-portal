import { VettedResultQuartiles } from '../types'
import calculateVettedResultQuartile from './calculate-vetted-result-quartile'

describe('calculateVettedResultQuartile', () => {
  const threshold25 = 2
  const threshold75 = 4

  describe('when value is greater than or equal to the 75% threshold', () => {
    it('returns vetted result quartile: Top 25%', () => {
      const value1 = threshold75
      const value2 = threshold75 + 1

      expect(
        calculateVettedResultQuartile(value1, threshold25, threshold75)
      ).toBe(VettedResultQuartiles.Top25)
      expect(
        calculateVettedResultQuartile(value2, threshold25, threshold75)
      ).toBe(VettedResultQuartiles.Top25)
    })
  })

  describe('when value is greater than or equal to the 25% threshold', () => {
    it('returns vetted result quartile: Between 25% and 75%', () => {
      const value1 = threshold25
      const value2 = threshold25 + 1
      const value3 = threshold75 - 1

      expect(
        calculateVettedResultQuartile(value1, threshold25, threshold75)
      ).toBe(VettedResultQuartiles.Between25And75)
      expect(
        calculateVettedResultQuartile(value2, threshold25, threshold75)
      ).toBe(VettedResultQuartiles.Between25And75)
      expect(
        calculateVettedResultQuartile(value3, threshold25, threshold75)
      ).toBe(VettedResultQuartiles.Between25And75)
    })
  })

  describe('when value is less than the 25% threshold', () => {
    it('returns vetted result quartile: Bottom 25%', () => {
      const value = threshold25 - 1

      expect(
        calculateVettedResultQuartile(value, threshold25, threshold75)
      ).toBe(VettedResultQuartiles.Bottom25)
    })
  })
})
