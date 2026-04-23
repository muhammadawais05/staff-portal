import { extractCleanLocationHash } from './extract-clean-location-hash'

describe('extractCleanLocationHash', () => {
  describe('extracts clean location hash', () => {
    it.each([
      [{ input: '#foo#modal' }, { expected: 'foo' }],
      [{ input: '#foo' }, { expected: 'foo' }],
      [{ input: undefined }, { expected: null }]
    ])('%s -> %s', ({ input }, { expected }) => {
      expect(extractCleanLocationHash(input)).toEqual(expected)
    })
  })
})
