import { getFirstResponseDataKey } from './get-first-response-data-key'

describe('getFirstResponseDataKey', () => {
  it('returns nothing if there are no keys', () => {
    const data = {}

    expect(getFirstResponseDataKey(data)).toBeUndefined()
  })

  it('returns a key code if there is only one item', () => {
    const data = { test: 'abc' }

    expect(getFirstResponseDataKey(data)).toBe('test')
  })

  it('throws an error if there are multiple items', () => {
    const data = { test: 'abc', test2: 'foo' }

    expect(() => getFirstResponseDataKey(data)).toThrow(
      `Mutation response data contains more than one key (["test","test2"]). Provide "mutationResult" option to specify key to extract`
    )
  })
})
