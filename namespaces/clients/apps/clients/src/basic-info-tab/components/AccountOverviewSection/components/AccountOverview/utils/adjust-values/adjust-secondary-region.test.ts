import { adjustSecondaryRegionId } from './adjust-secondary-region'

describe('adjustSecondaryRegionId', () => {
  describe('returns proper value for', () => {
    it.each([
      [{ secondaryRegionId: undefined }, { secondaryRegionId: null }],
      [{ secondaryRegionId: '' }, { secondaryRegionId: null }],
      [{}, { secondaryRegionId: null }],
      [{ secondaryRegionId: 'test' }, { secondaryRegionId: 'test' }]
    ])('%s', (input, expected) => {
      expect(adjustSecondaryRegionId(input)).toMatchObject(expected)
    })
  })
})
