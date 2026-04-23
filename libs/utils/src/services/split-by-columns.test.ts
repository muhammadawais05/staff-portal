import { splitByColumns } from './split-by-columns'

describe('splitByColumns', () => {
  it.each([
    [{ arr: [1, 2, 3], size: 1 }, [[1], [2], [3]]],
    [{ arr: [1, 2, 3], size: 2 }, [[1, 2], [3]]],
    [{ arr: [1, 2, 3], size: 3 }, [[1, 2, 3]]],
    [{ arr: [1, 2, 3], size: 4 }, [[1, 2, 3]]]
  ])('splits an array into n columns %s', ({ arr, size }, expected) => {
    const result = splitByColumns(arr, size)

    expect(result).toMatchObject(expected)
  })
})
