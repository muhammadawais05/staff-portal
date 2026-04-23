import { stringListToOptions } from './string-list-to-options'

describe('stringListToOptions', () => {
  it('returns empty array from empty strings array', () => {
    expect(stringListToOptions([])).toEqual([])
    expect(stringListToOptions()).toEqual([])
    expect(stringListToOptions(null)).toEqual([])
  })

  it('returns text-value pairs array from strings array', () => {
    expect(stringListToOptions(['1', '2', '3'])).toEqual([
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' }
    ])
  })
})
