import { normalizeCurrencyAmount } from './normalize-currency-amount'

describe('normalizeCurrencyAmount', () => {
  it('normalizes provided string value', () => {
    expect(normalizeCurrencyAmount('0.12345')).toBe('0.12')
    expect(normalizeCurrencyAmount('0')).toBe('0.00')
    expect(normalizeCurrencyAmount('1.00')).toBe('1.00')
    expect(normalizeCurrencyAmount('1')).toBe('1.00')
    expect(normalizeCurrencyAmount('22.0')).toBe('22.00')
    expect(normalizeCurrencyAmount('')).toBe('0.00')
  })

  it('normalizes provided numeric value', () => {
    expect(normalizeCurrencyAmount(0.12345)).toBe('0.12')
    expect(normalizeCurrencyAmount(0)).toBe('0.00')
    expect(normalizeCurrencyAmount(1.0)).toBe('1.00')
    expect(normalizeCurrencyAmount(1)).toBe('1.00')
    expect(normalizeCurrencyAmount(22.0)).toBe('22.00')
  })

  it('normalizes provided invalid value', () => {
    expect(normalizeCurrencyAmount(NaN)).toBeUndefined()
    expect(normalizeCurrencyAmount(undefined)).toBeUndefined()
    expect(normalizeCurrencyAmount(null)).toBeUndefined()
    expect(normalizeCurrencyAmount('abc')).toBeUndefined()
  })
})
