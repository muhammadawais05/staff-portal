import { greaterThanOrEmpty } from './greater-than-or-empty'

describe('greaterThanOrEmpty validator', () => {
  it.each([
    [1, ''],
    [1, null],
    [1, undefined],
    [-1, 0],
    [1, 2],
    [0, 1],
    [0, '1'],
    [100, 200]
  ])('returns undefined if input is correct', (compareValue, value) => {
    expect(greaterThanOrEmpty(compareValue)(value)).toBeUndefined()
  })

  it.each([
    [-1, -2],
    [0, -1],
    [1, '0'],
    [2, '-1'],
    [2, 'abc']
  ])('returns error if input is incorrect', (compareValue, value) => {
    expect(greaterThanOrEmpty(compareValue)(value)).toBe(
      `Must be greater than ${compareValue}`
    )
  })
})
