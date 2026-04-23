import { getHighlightDateInterval } from './get-highlight-date-interval'

describe('getHighlightDateInterval', () => {
  describe('when start date is missing', () => {
    it('returns null', () => {
      expect(getHighlightDateInterval()).toBeNull()
      expect(getHighlightDateInterval(null, 2022)).toBeNull()
      expect(getHighlightDateInterval(undefined, 2022)).toBeNull()
    })
  })

  describe('when end date is missing', () => {
    it('returns present', () => {
      expect(getHighlightDateInterval(2021)).toBe('(2021 - PRESENT)')
    })
  })

  describe('when passing start and enc dates', () => {
    it('returns interval', () => {
      expect(getHighlightDateInterval(2021, 2022)).toBe('(2021 - 2022)')
    })
  })
})
