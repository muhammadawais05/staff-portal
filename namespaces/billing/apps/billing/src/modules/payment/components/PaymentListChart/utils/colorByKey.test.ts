import { colorByKey } from './colorByKey'

describe('#colorByKey', () => {
  describe('when argument is "paid_early"', () => {
    it('returns "blue"', () => {
      expect(colorByKey('paid_early')).toBe('blue')
    })
  })

  describe('when argument is "not_received"', () => {
    it('returns "yellow"', () => {
      expect(colorByKey('not_received')).toBe('yellow')
    })
  })
})
