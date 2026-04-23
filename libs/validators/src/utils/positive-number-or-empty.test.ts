import { positiveNumberOrEmpty } from './positive-number-or-empty'

describe('positiveNumberOrEmpty validator', () => {
  it('returns nothing if input is correct', () => {
    expect(positiveNumberOrEmpty(1)).toBeUndefined()
    expect(positiveNumberOrEmpty('1')).toBeUndefined()
    expect(positiveNumberOrEmpty('100')).toBeUndefined()
  })

  it('returns error if input is incorrect', () => {
    const error = 'Must be greater than 0'

    expect(positiveNumberOrEmpty(-1)).toEqual(error)
    expect(positiveNumberOrEmpty(0)).toEqual(error)
    expect(positiveNumberOrEmpty('0')).toEqual(error)
    expect(positiveNumberOrEmpty('-1')).toEqual(error)
    expect(positiveNumberOrEmpty('abc')).toEqual(error)
  })
})
