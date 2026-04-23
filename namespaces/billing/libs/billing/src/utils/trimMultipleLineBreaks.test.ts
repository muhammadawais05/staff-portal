import { trimMultipleLineBreaks } from './trimMultipleLineBreaks'

describe('#trimMultipleLineBreaks', () => {
  describe('when passed text with empty lines', () => {
    it('empty lines should be trimmed', () => {
      expect(
        trimMultipleLineBreaks('a\n\r\n\r\n\r\n\rb\n\r\n\r\n\r\n\rc')
      ).toBe('a\nb\nc')
    })
  })

  describe('when passed text with line breaks and spaces', () => {
    it('empty lines should not be trimmed', () => {
      expect(
        trimMultipleLineBreaks('a\n\r \n\r \n\r \n\rb\n\r \n\r \n\r\n\rc')
      ).toBe(`a\n \n \n \nb\n \n \nc`)
    })
  })
})
