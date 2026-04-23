import titleize from './titleize'

describe('titleize', () => {
  it('should work without any options', () => {
    expect(titleize('NO_VALUE')).toBe('No Value')
  })

  it('should work with options', () => {
    expect(titleize('NO_VALUE', { capitalizeAllWords: false })).toBe('No value')
    expect(titleize('NO-VALUE', { splitter: '-', separator: '_' })).toBe(
      'No_Value'
    )
    expect(titleize('NoValue', { splitter: /([A-Z][a-z]*)/g })).toBe('No Value')
  })

  it('should use ap style title case', () => {
    expect(titleize('text_is_in_ap_style')).toBe('Text Is in Ap Style')
  })
})
