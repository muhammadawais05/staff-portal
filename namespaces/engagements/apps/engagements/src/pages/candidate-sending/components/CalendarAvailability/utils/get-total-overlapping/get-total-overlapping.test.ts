import { getTotalOverlapping } from './get-total-overlapping'

describe('getTotalOverlapping', () => {
  describe('when passing an empty array', () => {
    it('returns zero', () => {
      expect(getTotalOverlapping([])).toBe(0)
    })
  })

  describe('when passing one item array', () => {
    it('returns the slots count', () => {
      expect(
        getTotalOverlapping([{ date: '2022-02-02', slotsCount: 33 }])
      ).toBe(33)
    })
  })

  describe('when passing multiple items array', () => {
    it('returns the sum of slots', () => {
      expect(
        getTotalOverlapping([
          { date: '2022-02-02', slotsCount: 33 },
          { date: '2022-02-03', slotsCount: 2 }
        ])
      ).toBe(35)
    })
  })
})
