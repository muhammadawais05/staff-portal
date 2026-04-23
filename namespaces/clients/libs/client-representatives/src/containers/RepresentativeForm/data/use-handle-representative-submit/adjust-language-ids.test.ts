import { adjustLanguageIds } from './adjust-language-ids'

describe('adjustLanguageIds', () => {
  it.each([
    [[], []],
    [undefined, undefined],
    [
      [
        {
          text: 'foo',
          value: 'foo-value'
        },
        {
          text: 'bar',
          value: 'bar-value'
        }
      ],
      ['foo-value', 'bar-value']
    ]
  ])('for given %o returns %p', (input, expectedOutput) => {
    expect(adjustLanguageIds(input)).toEqual(expectedOutput)
  })
})
