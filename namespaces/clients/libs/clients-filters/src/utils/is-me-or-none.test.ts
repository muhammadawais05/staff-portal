import { ME_NONE_SET } from '../config'
import { isMeOrNone } from './is-me-or-none'

describe('isMeOrNone', () => {
  it.each([
    [' ', false],
    ['123', false],
    [null, false],
    [undefined, false],
    [ME_NONE_SET['me'], true],
    [ME_NONE_SET['none'], true]
  ])('returns proper value for %s', (value, expected) => {
    const result = isMeOrNone(value as string)

    expect(result).toBe(expected)
  })
})
