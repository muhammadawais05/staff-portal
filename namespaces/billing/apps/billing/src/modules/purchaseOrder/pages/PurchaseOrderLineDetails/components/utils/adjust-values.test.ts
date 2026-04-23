import { adjustAmount, adjustThreshold } from './adjust-values'

describe('adjustAmount', () => {
  it.each([
    [
      'handles valid amount',
      {
        input: { amount: '10' },
        expected: { amount: '10.00' }
      }
    ],
    [
      'handles weird amount format',
      {
        input: { amount: '2.' },
        expected: { amount: '2.00' }
      }
    ],
    [
      'handles weird amount format',
      {
        input: { amount: '2.0004' },
        expected: { amount: '2.00' }
      }
    ],
    [
      'handles undefined amount',
      {
        input: {},
        expected: { amount: null }
      }
    ]
  ])('%s', (_, { input, expected }) => {
    const actual = adjustAmount(input)

    expect(actual).toEqual(expected)
  })
})

describe('adjustThreshold', () => {
  it.each([
    [
      'handles valid threshold',
      {
        key: 'threshold',
        input: { threshold: '10' },
        expected: { threshold: '10' }
      }
    ],
    [
      'handles undefined threshold',
      {
        key: 'threshold',
        input: {},
        expected: { threshold: null }
      }
    ]
  ])('%s', (_, { input, expected }) => {
    const actual = adjustThreshold(input)

    expect(actual).toEqual(expected)
  })
})
