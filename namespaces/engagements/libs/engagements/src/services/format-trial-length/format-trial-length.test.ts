import { formatTrialLength } from './format-trial-length'

describe('#formatTrialLength', () => {
  it('format the trial length correctly', () => {
    expect(formatTrialLength(null)).toBe('No trial')
    expect(formatTrialLength(undefined)).toBe('No trial')
    expect(formatTrialLength(0)).toBe('No trial')
    expect(formatTrialLength(1)).toBe('1 business day')
    expect(formatTrialLength(2)).toBe('2 business days')
  })
})
