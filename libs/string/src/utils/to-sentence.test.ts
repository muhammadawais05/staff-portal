import toSentence from './to-sentence'

const COLORS = ['blue', 'red', 'yellow']

describe('toSentence', () => {
  it('returns empty string if empty array provided', () => {
    expect(toSentence([])).toBe('')
  })

  it('formats to sentence (with default options)', () => {
    expect(toSentence(['red'])).toBe('red')
    expect(toSentence(COLORS)).toBe('blue, red or yellow')
  })

  it('formats to sentence (with custom options)', () => {
    expect(
      toSentence(COLORS, { endSign: '.', textTransform: 'capitalize' })
    ).toBe('Blue, red or yellow.')
    expect(toSentence(COLORS, { divider2: ' and ' })).toBe(
      'blue, red and yellow'
    )
  })
})
