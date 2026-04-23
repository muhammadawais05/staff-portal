import { getClientNameWithFallback } from './get-client-name-with-fallback'

describe('getClientNameWithFallback()', () => {
  describe('when client name is not empty', () => {
    it('returns the client name', () => {
      const CLIENT_NAME = 'Test Name acj93s'

      expect(getClientNameWithFallback(CLIENT_NAME)).toEqual(CLIENT_NAME)
    })
  })

  describe('when client name is empty', () => {
    it('falls back to "Hidden company"', () => {
      expect(getClientNameWithFallback()).toBe('Hidden company')
      expect(getClientNameWithFallback(null)).toBe('Hidden company')
    })
  })
})
