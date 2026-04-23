import { getCertificationDate } from './get-certification-date'

describe('getCertificationDate', () => {
  describe('when year is missing', () => {
    it('returns null', () => {
      expect(getCertificationDate(12)).toBeNull()
    })
  })

  describe('when month is missing', () => {
    it('returns null', () => {
      expect(getCertificationDate(null, 2020)).toBeNull()
    })
  })

  describe('when month and year are missing', () => {
    it('returns null', () => {
      expect(getCertificationDate()).toBeNull()
    })
  })

  describe('when month and year are provided', () => {
    it('returns date', () => {
      expect(getCertificationDate(1, 2022)).toBe('February 2022')
    })
  })
})
