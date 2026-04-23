import { formatter } from './formatter'

describe('formatter', () => {
  describe('when value is a string or a number', () => {
    it('formats to percentage', () => {
      expect(formatter(7.34, 'percentage')).toBe('7.34%')
      expect(formatter('7.34', 'percentage')).toBe('7.34%')
    })

    it('formats to percentage with single decimal', () => {
      expect(formatter(7.45, 'percentageWithSingleDecimal')).toBe('7.5%')
      expect(formatter('7.45', 'percentageWithSingleDecimal')).toBe('7.5%')
    })
  })

  describe('when value is a string', () => {
    it('formats to lower case', () => {
      expect(formatter('thIs is A SenTenCE', 'lowerCase')).toBe(
        'this is a sentence'
      )
    })

    it('formats to start case', () => {
      expect(formatter('tHIs Is a SenTENCE', 'startCase')).toBe(
        'This Is A Sentence'
      )
    })

    it('formats to title case', () => {
      expect(formatter('this is a sentence', 'titleCase')).toBe(
        'This Is a Sentence'
      )
    })
  })

  describe('when value is a number', () => {
    it('formats to USD', () => {
      expect(formatter(5.54, 'usd')).toBe('$5.54')
    })
  })

  describe('when value is a date', () => {
    it('formats a date', () => {
      expect(formatter(new Date('2/1/22'), 'MM/yyyy')).toBe('02/2022')
    })
  })
})
