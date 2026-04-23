import { adjustTotalFunding } from '.'

describe('adjustTotalFunding', () => {
  describe('returns proper value for', () => {
    it.each([
      [{ totalFunding: '10' }, { totalFunding: '10' }],
      [{ totalFunding: '' }, { resetTotalFunding: true }],
      [{ totalFunding: undefined }, { resetTotalFunding: true }]
    ])('%s', (input, expected) => {
      expect(adjustTotalFunding(input)).toMatchObject(expected)
    })
  })
})
