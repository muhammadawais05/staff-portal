import { generateDetailedListRows } from './generate-detailed-list-rows'

describe('#generateDetailedListRows', () => {
  it('returns row structure', () => {
    expect(generateDetailedListRows([1, 2, 3, 4], 2)).toEqual([
      [1, 3],
      [2, 4]
    ])
  })
})
