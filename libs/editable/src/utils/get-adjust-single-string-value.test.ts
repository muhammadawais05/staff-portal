import { getAdjustSingleStringValue } from '.'

describe('getAdjustSingleStringValue', () => {
  describe('returns proper value for', () => {
    it.each([
      [{ a: 'a' }, { a: 'a' }],
      [{ a: 'a  b' }, { a: 'a  b' }],
      [{ a: ' a  b' }, { a: 'a  b' }],
      [{ a: 'a  b  ' }, { a: 'a  b' }],
      [{ a: ' a   ' }, { a: 'a' }],
      [{ a: '' }, { a: '' }],
      [{ a: '   ' }, { a: '' }],
      [{ a: 'a', b: 'b', c: 'c' }, { a: 'a' }],
      [{}, { a: '' }],
      [{ a: undefined }, { a: '' }],
      [{ a: null }, { a: '' }]
    ])('%s', (input, expected) => {
      const adjust = getAdjustSingleStringValue<{
        a?: string | null | undefined
      }>('a')
      const adjusted = adjust(input)

      expect(adjusted).toMatchObject(expected)
    })
  })
})
