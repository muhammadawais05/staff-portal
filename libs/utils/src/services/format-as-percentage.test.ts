import { formatAsPercentage } from './format-as-percentage'

describe('formatAsPercentage', () => {
  it('format provided decimal value as percentage', () => {
    expect(formatAsPercentage(0.12345)).toBe('12%')
    expect(formatAsPercentage(0.12345, 2)).toBe('12.35%')
    expect(formatAsPercentage(12345, 2)).toBe('1234500.00%')
    expect(formatAsPercentage(0, 5)).toBe('0.00000%')
    expect(formatAsPercentage(0)).toBe('0%')
  })
})
