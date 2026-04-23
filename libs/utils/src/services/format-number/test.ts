import { formatNumber } from './format-number'

describe('formatNumber', () => {
  describe('when a browser has Intl object', () => {
    it('should return formatted number', () => {
      const number = 1000000
      const result = formatNumber(number)

      expect(result).toBe('1,000,000')
    })
  })

  describe('when a browser does not have Intl object', () => {
    beforeAll(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      global.Intl = undefined
    })

    it('should return origin number', () => {
      const number = 1000000
      const result = formatNumber(number)

      expect(result).toBe(number)
    })
  })
})
