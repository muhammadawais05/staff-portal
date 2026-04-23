import { stringListToItems } from './string-list-to-items'

describe('stringListToItems', () => {
  it('returns empty array from empty strings array', () => {
    expect(stringListToItems([])).toEqual([])
    expect(stringListToItems()).toEqual([])
    expect(stringListToItems(null)).toEqual([])
  })

  it('returns text-value pairs array from strings array', () => {
    expect(stringListToItems(['1', '2', '3'])).toEqual([
      { text: '1', value: '1' },
      { text: '2', value: '2' },
      { text: '3', value: '3' }
    ])
  })
})
