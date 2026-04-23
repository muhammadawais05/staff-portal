import { formatDecimalNumber } from './format-decimal-number'

describe('formatDecimalNumber', () => {
  it('works with empty string or non-number values', () => {
    expect(formatDecimalNumber('')).toBe('')
    expect(formatDecimalNumber('test')).toBe('')
    expect(formatDecimalNumber('test88')).toBe('')
    expect(formatDecimalNumber('88test')).toBe('')
  })

  it('works with numbers', () => {
    expect(formatDecimalNumber('.')).toBe('0.00')
    expect(formatDecimalNumber('.8')).toBe('0.80')
    expect(formatDecimalNumber('.88')).toBe('0.88')
    expect(formatDecimalNumber('.8888')).toBe('0.88')
    expect(formatDecimalNumber('8')).toBe('8.00')
    expect(formatDecimalNumber('8.')).toBe('8.00')
    expect(formatDecimalNumber('8.8')).toBe('8.80')
    expect(formatDecimalNumber('8.88')).toBe('8.88')
    expect(formatDecimalNumber('8.8888')).toBe('8.88')
    expect(formatDecimalNumber('00000.0000')).toBe('0.00')
    expect(formatDecimalNumber('00000.')).toBe('0.00')
    expect(formatDecimalNumber('00000')).toBe('0.00')
    expect(formatDecimalNumber('0')).toBe('0.00')
  })
})
