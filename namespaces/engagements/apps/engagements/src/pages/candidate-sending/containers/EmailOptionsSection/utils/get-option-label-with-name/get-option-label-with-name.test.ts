import getOptionLabelWithName from './get-option-label-with-name'

describe('getOptionLabelWithName', () => {
  describe('when `fullName` is not set', () => {
    it('returns option label', () => {
      const optionLabel = getOptionLabelWithName({
        label: 'Matcher'
      })

      expect(optionLabel).toBe('Matcher')
    })
  })

  describe('when `fullName` is set', () => {
    it('returns option label', () => {
      const optionLabel = getOptionLabelWithName({
        label: 'Matcher',
        fullName: 'Timofei Kachalov'
      })

      expect(optionLabel).toBe('Matcher (Timofei Kachalov)')
    })
  })
})
