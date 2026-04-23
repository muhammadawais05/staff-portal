import { keyFields } from '../key-fields'

describe('#keyFields', () => {
  it('`keyFields` does not throw exception if all keys exists', () => {
    expect(
      keyFields(['id', 'node.id'])(
        { id: '123', node: { id: '456' } },
        { __typename: 'foo' }
      )
    ).toBe('123+456')
  })

  it('`keyFields` throws exception if required key not found', () => {
    expect(() =>
      keyFields(['id', 'node.id'])({ id: '123' }, { __typename: 'foo' })
    ).toThrow(
      `Mandatory key 'node.id' is not defined for object with keys ["id"] and context {"__typename":"foo"}`
    )
  })

  it('`keyFields` does not throw exception if at least one of optional keys is found', () => {
    expect(
      keyFields(['id', 'node.id'], true)({ id: '123' }, { __typename: 'foo' })
    ).toBe('123')
  })

  it('`keyFields` throws exception if at least one of optional keys is not found', () => {
    expect(() =>
      keyFields(['id', 'node.id'], true)({ abc: 'foo' }, { __typename: 'foo' })
    ).toThrow(
      `Non of optional keys '["id","node.id"]' defined for object with keys ["abc"] and context {"__typename":"foo"}`
    )
  })
})
