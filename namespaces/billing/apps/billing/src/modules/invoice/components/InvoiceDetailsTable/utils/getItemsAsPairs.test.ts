import { getItemsAsPairs } from '.'

describe('#getItemsAsPairs', () => {
  it.each([
    [
      'handles even number array',
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      [
        [1, 6],
        [2, 7],
        [3, 8],
        [4, 9],
        [5, 10]
      ]
    ],
    [
      'handles odd number array',
      [1, 2, 3, 4, 5, 6, 7, 8, 9],
      [
        [1, 6],
        [2, 7],
        [3, 8],
        [4, 9],
        [5, undefined]
      ]
    ]
  ])('%s', (_, input, expected) => {
    const actual = getItemsAsPairs(input)

    expect(actual).toEqual(expected)
  })
})
