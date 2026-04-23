import { formatValue } from './format-value'

describe('formatValue', () => {
  it('returns No data', () => {
    expect(
      formatValue(
        { name: 'a', value: 1, color: 'b', payload: { aIsEmpty: 1 } },
        'm'
      )
    ).toBe('No data')
  })

  it('returns formatted minutes', () => {
    expect(
      formatValue(
        { name: 'a', value: 4441, color: 'b', payload: {} },
        'minutes'
      )
    ).toBe('3d 2h 1m')
  })

  it('returns result in the default format', () => {
    expect(
      formatValue({ name: 'a', value: 400, color: 'b', payload: {} }, 'USD')
    ).toBe('400 USD')
  })
})
