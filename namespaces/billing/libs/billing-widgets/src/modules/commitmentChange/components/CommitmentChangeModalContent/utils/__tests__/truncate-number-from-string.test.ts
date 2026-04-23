import { truncateNumberFromString } from '../truncate-number-from-string'

describe('CommitmentChangeModal Utils', () => {
  it('truncates number from string', () => {
    expect(truncateNumberFromString('1')).toBe('1')
    expect(truncateNumberFromString('10.0')).toBe('10')
    expect(truncateNumberFromString('100.05')).toBe('100')
    expect(truncateNumberFromString(undefined)).toBe('0')
  })
})
