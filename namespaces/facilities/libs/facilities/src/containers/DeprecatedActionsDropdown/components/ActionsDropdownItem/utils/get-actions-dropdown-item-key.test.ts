import { getActionsDropdownItemKey } from '.'

describe('getActionsDropdownItemKey', () => {
  it('returns key if key is specified', () => {
    const key = 'foo'
    const label = 'bar'

    expect(getActionsDropdownItemKey({ key, label })).toBe(key)
  })

  it('returns transformed label if key is not specified', () => {
    const label = 'Foo Bar'

    expect(getActionsDropdownItemKey({ label })).toBe('FooBar')
  })
})
