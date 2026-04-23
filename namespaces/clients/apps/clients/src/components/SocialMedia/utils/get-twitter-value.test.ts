import { getTwitterValue } from '.'

describe('#getTwitterValue', () => {
  describe.each([
    { value: '@testName', expected: 'testName' },
    { value: null, expected: '' },
    { value: undefined, expected: '' }
  ])('variations', ({ value, expected }) => {
    describe(`when the provided value is ${JSON.stringify(value)}`, () => {
      it(`returns ${expected}`, () => {
        expect(getTwitterValue(value)).toBe(expected)
      })
    })
  })
})
