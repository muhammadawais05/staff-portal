import getDiscountedValue from './get-discounted-value'

describe('getDiscountedValue', () => {
  it.each([
    { value: '1', expectedValue: '0' },
    { value: '0.97', expectedValue: '3' },
    { value: '0.95', expectedValue: '5' }
  ])('correctly calculate discounted value', ({ value, expectedValue }) => {
    expect(getDiscountedValue(value)).toBe(expectedValue)
  })
})
