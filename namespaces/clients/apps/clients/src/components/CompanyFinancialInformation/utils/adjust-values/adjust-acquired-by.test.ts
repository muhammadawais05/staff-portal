import { adjustAcquiredBy } from '.'

describe('adjustAcquiredBy', () => {
  describe('returns proper value for', () => {
    it.each([
      [{ acquiredBy: ['a'] }, { acquiredBy: ['a'] }],
      [{ acquiredBy: [] }, { acquiredBy: [] }],
      [{ acquiredBy: 'a,b, c,   d' }, { acquiredBy: ['a', 'b', 'c', 'd'] }],
      [{ acquiredBy: '' }, { acquiredBy: [] }],
      [{ acquiredBy: undefined }, { acquiredBy: [] }]
    ])('%s', (input, expected) => {
      expect(adjustAcquiredBy(input)).toMatchObject(expected)
    })
  })
})
