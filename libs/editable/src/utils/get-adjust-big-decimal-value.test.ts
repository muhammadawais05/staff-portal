import { getAdjustBigDecimalValue } from '.'

describe('getAdjustSingleStringValue', () => {
  describe('returns proper value for', () => {
    it.each([
      [{ a: 'a' }, { a: 'a' }],
      [{ a: 'a  b' }, { a: 'a  b' }],
      [{ a: ' a  b' }, { a: 'a  b' }],
      [{ a: 'a  b  ' }, { a: 'a  b' }],
      [{ a: ' a   ' }, { a: 'a' }],
      [{ a: '' }, { a: null }],
      [{ a: '   ' }, { a: null }],
      [{ a: 'a', b: 'b', c: 'c' }, { a: 'a' }],
      [{}, { a: null }],
      [{ a: undefined }, { a: null }],
      [{ a: null }, { a: null }]
    ])('%s', (input, expected) => {
      const adjust = getAdjustBigDecimalValue<{
        a?: string | null | undefined
      }>('a')
      const adjusted = adjust(input)

      expect(adjusted).toMatchObject(expected)
    })
  })
})
