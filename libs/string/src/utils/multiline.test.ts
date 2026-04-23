import { multilineText } from './multiline'

describe('Language util', () => {
  describe('multilineText', () => {
    it('should split text into two lines', () => {
      expect(multilineText('Hello\nWorld')).toEqual(['Hello', 'World'])
    })

    it('should remove empty lines', () => {
      expect(multilineText('\nHello\n\nWorld\n')).toEqual(['Hello', 'World'])
    })

    it('should return one line', () => {
      expect(multilineText('Hello World')).toEqual(['Hello World'])
      expect(multilineText('Hello World\n')).toEqual(['Hello World'])
      expect(multilineText('\nHello World')).toEqual(['Hello World'])
    })

    describe('when blankLines flag is set to true', () => {
      it('should left empty lines inside text', () => {
        expect(multilineText('Hello\n\n\nWorld', { blankLines: true })).toEqual(
          ['Hello', '', '', 'World']
        )
      })

      it('should not left more then two empty lines', () => {
        expect(
          multilineText('Hello\n\n\n\n\n\n\nWorld', { blankLines: true })
        ).toEqual(['Hello', '', '', 'World'])
      })

      it('should trim empty lines', () => {
        expect(
          multilineText('\n\nHello\n\n\nWorld\n', { blankLines: true })
        ).toEqual(['Hello', '', '', 'World'])
      })
    })

    it('should return empty array', () => {
      expect(multilineText('', { blankLines: true })).toEqual([])
      expect(multilineText('')).toEqual([])
    })
  })
})
