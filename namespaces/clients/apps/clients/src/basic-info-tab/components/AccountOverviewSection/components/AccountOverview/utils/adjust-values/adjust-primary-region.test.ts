import { adjustPrimaryRegionId } from './adjust-primary-region'

describe('adjustPrimaryRegionId', () => {
  describe('returns proper value for', () => {
    it.each([
      [{ primaryRegionId: undefined }, { primaryRegionId: null }],
      [{ primaryRegionId: '' }, { primaryRegionId: null }],
      [{}, { primaryRegionId: null }],
      [{ primaryRegionId: 'test' }, { primaryRegionId: 'test' }]
    ])('%s', (input, expected) => {
      expect(adjustPrimaryRegionId(input)).toMatchObject(expected)
    })
  })
})
