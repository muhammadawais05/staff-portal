import { getFirstMessage } from './utils'

describe('TooltipContent', () => {
  describe('utils', () => {
    it('gets first message from a list', () => {
      expect(getFirstMessage(['first', 'second'])).toBe('first')
    })

    it('gets message from text', () => {
      expect(getFirstMessage('message')).toBe('message')
    })

    it('returns undefined for an empty messages list', () => {
      expect(getFirstMessage([])).toBeUndefined()
    })
  })
})
