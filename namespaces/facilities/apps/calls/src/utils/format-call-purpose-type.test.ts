import formatCallPurposeType from './format-call-purpose-type'

describe('format-call-purpose-type', () => {
  describe('when roleType is Company', () => {
    it('returns "CLIENT"', () => {
      const result = formatCallPurposeType('Company')

      expect(result).toBe('CLIENT')
    })
  })

  describe('when roleType is Talent', () => {
    it('returns "TALENT"', () => {
      const result = formatCallPurposeType('Talent')

      expect(result).toBe('TALENT')
    })
  })

  describe('when roleType is null', () => {
    it('returns "UNKNOWN"', () => {
      const result = formatCallPurposeType(null)

      expect(result).toBe('UNKNOWN')
    })
  })

  describe('when roleType is any other type', () => {
    it('returns "UNKNOWN"', () => {
      const result = formatCallPurposeType('someType')

      expect(result).toBe('UNKNOWN')
    })
  })
})
