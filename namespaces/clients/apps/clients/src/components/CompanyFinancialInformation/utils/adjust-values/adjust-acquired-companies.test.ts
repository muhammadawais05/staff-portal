import { adjustAcquiredCompanies } from '.'

describe('adjustAcquiredCompanies', () => {
  describe('returns proper value for', () => {
    it.each([
      [{ acquiredCompanies: ['a'] }, { acquiredCompanies: ['a'] }],
      [{ acquiredCompanies: [] }, { acquiredCompanies: [] }],
      [
        { acquiredCompanies: 'a,b, c,   d' },
        { acquiredCompanies: ['a', 'b', 'c', 'd'] }
      ],
      [{ acquiredCompanies: '' }, { acquiredCompanies: [] }],
      [{ acquiredCompanies: undefined }, { acquiredCompanies: [] }]
    ])('%s', (input, expected) => {
      expect(adjustAcquiredCompanies(input)).toMatchObject(expected)
    })
  })
})
