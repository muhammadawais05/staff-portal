import { splitTotalsInChunks } from './splitIntoChuncks'

describe('splitTotalsInChunks', () => {
  describe('default params', () => {
    it('returns an original array as the only chunk if length <= 6', () => {
      expect(splitTotalsInChunks([1, 2, 3, 4, 5, 6])).toEqual([
        [1, 2, 3, 4, 5, 6]
      ])
    })

    it('returns in 4 items chunks', () => {
      expect(splitTotalsInChunks([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9]
      ])
    })
  })

  describe('custom params', () => {
    describe('when splitMinSize <= array.length', () => {
      it('returns an original array', () => {
        expect(splitTotalsInChunks([1, 2, 3], 2, 3)).toEqual([[1, 2, 3]])
        expect(splitTotalsInChunks([1, 2, 3], 2, 4)).toEqual([[1, 2, 3]])
        expect(splitTotalsInChunks([1, 2, 3], 2, 10)).toEqual([[1, 2, 3]])
      })
    })

    describe('when splitMinSize > array.length', () => {
      it('returns splits an array in required chunks', () => {
        expect(splitTotalsInChunks([1, 2, 3], 2, 2)).toEqual([[1, 2], [3]])
        expect(splitTotalsInChunks([1, 2, 3, 4, 5], 2, 4)).toEqual([
          [1, 2],
          [3, 4],
          [5]
        ])
        expect(splitTotalsInChunks([1, 2, 3], 1, 2)).toEqual([[1], [2], [3]])
      })
    })
  })
})
