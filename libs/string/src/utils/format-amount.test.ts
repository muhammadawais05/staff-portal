import { formatAmount } from './format-amount'

describe('formatAmount', () => {
  it('formats number to amount', () => {
    expect(formatAmount(10)).toBe('$10')
    expect(formatAmount(10.11)).toBe('$10')
    expect(formatAmount(10, 2)).toBe('$10.00')
    expect(formatAmount(10.11, 2)).toBe('$10.11')
  })

  it('formats string to amount', () => {
    expect(formatAmount('10')).toBe('$10')
    expect(formatAmount('10.11')).toBe('$10')
    expect(formatAmount('10', 2)).toBe('$10.00')
    expect(formatAmount('10.11', 2)).toBe('$10.11')
  })

  it('formats supports nullish values', () => {
    expect(formatAmount(null)).toBeNull()
    expect(formatAmount(undefined)).toBeUndefined()
  })
})
