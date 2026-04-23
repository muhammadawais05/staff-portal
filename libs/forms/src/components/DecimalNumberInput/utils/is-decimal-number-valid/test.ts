import { isDecimalNumberValid } from './is-decimal-number-valid'

describe('isDecimalNumberValid', () => {
  it('works with full number', () => {
    expect(isDecimalNumberValid('8')).toBe(true)
    expect(isDecimalNumberValid('8.8')).toBe(true)
    expect(isDecimalNumberValid('0.8')).toBe(true)
    expect(isDecimalNumberValid('88888888888.88')).toBe(true)
  })

  it('works with numbers that starts with dot', () => {
    expect(isDecimalNumberValid('.')).toBe(true)
    expect(isDecimalNumberValid('.8')).toBe(true)
    expect(isDecimalNumberValid('.88')).toBe(true)
  })

  it('works with numbers that ends with dot', () => {
    expect(isDecimalNumberValid('8.')).toBe(true)
    expect(isDecimalNumberValid('8888.')).toBe(true)
  })

  it('returns false for invalid numbers', () => {
    expect(isDecimalNumberValid('8..')).toBe(false)
    expect(isDecimalNumberValid('..8')).toBe(false)
    expect(isDecimalNumberValid('8..8')).toBe(false)
    expect(isDecimalNumberValid('abc')).toBe(false)
    expect(isDecimalNumberValid('abc123')).toBe(false)
    expect(isDecimalNumberValid('123abc')).toBe(false)
  })

  it('returns false for negative numbers', () => {
    expect(isDecimalNumberValid('-8')).toBe(false)
    expect(isDecimalNumberValid('-8.')).toBe(false)
    expect(isDecimalNumberValid('-8.88')).toBe(false)
    expect(isDecimalNumberValid('-0.88')).toBe(false)
  })

  it('returns false for large numbers', () => {
    expect(isDecimalNumberValid('888888888888')).toBe(false)
    expect(isDecimalNumberValid('888888888888.8888')).toBe(false)
    expect(isDecimalNumberValid('888888888888.')).toBe(false)
  })
})
