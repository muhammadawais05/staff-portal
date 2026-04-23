import stripDecimalsIfInteger from './strip-decimals-if-integer'

describe('stripDecimalsIfInteger', () => {
  it.each([
    { value: '0.00', expectedValue: '0' },
    { value: '-1.05', expectedValue: '-1.05' },
    { value: '-1.00', expectedValue: '-1' },
    { value: '1.00', expectedValue: '1' },
    { value: '1.02', expectedValue: '1.02' },
    { value: 1.01, expectedValue: '1.01' },
    { value: 2.02, expectedValue: '2.02' }
  ])('correctly strip decimals if integer', ({ value, expectedValue }) => {
    expect(stripDecimalsIfInteger(value)).toBe(expectedValue)
  })
})
