import { rangeQueryParam } from './range-query-param'

describe('rangeQueryParam', () => {
  it.each([
    [
      { from: '-10800', to: '36000' },
      {
        from: -10800,
        to: 36000
      }
    ],
    [
      { from: '-10800', to: undefined },
      {
        from: -10800
      }
    ],
    [
      { from: '0', to: '0' },
      {
        from: 0,
        to: 0
      }
    ]
  ])('should decode range query params %s', (values, expected) => {
    const result = rangeQueryParam.decode(values, {}, {})

    expect(result).toStrictEqual(expected)
  })

  it.each([
    [
      { from: -10800, to: 36000 },
      {
        from: '-10800',
        to: '36000'
      }
    ],
    [
      { from: -10800 },
      {
        from: '-10800',
        to: undefined
      }
    ],
    [
      { from: 0, to: 0 },
      {
        from: '0',
        to: '0'
      }
    ]
  ])('should encode range query params %s', (values, expected) => {
    const result = rangeQueryParam.encode(values)

    expect(result).toStrictEqual(expected)
  })
})
