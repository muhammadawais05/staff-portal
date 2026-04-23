import { isEmptyObject } from './is-empty-object'

describe('isEmptyObject', () => {
  it('returns false for objects that are not empty', () => {
    expect(isEmptyObject({ field: '' })).toBe(false)
    expect(isEmptyObject([0])).toBe(false)
    expect(isEmptyObject([''])).toBe(false)
  })

  it('return true for empty objects', () => {
    expect(isEmptyObject(undefined)).toBe(true)
    expect(isEmptyObject({})).toBe(true)
    expect(isEmptyObject([])).toBe(true)
  })
})
