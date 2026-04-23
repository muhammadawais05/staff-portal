import { serialize, deserialize } from './serializer'

const PLAIN_DATA = { valueText: 'test', valueArray: ['a', 'b'] }
const SERIALIZED_DATA = '?valueText=test&valueArray%5B%5D=a&valueArray%5B%5D=b'

describe('serialize() function', () => {
  it('serializes parameters', () => {
    expect(serialize(PLAIN_DATA)).toEqual(SERIALIZED_DATA)
  })

  it('skips parameters with an empty string as a value', () => {
    expect(serialize({ valueEmpty: '' })).toBe('')
  })
})

describe('deserialize() function', () => {
  it('deserializes parameters', () => {
    expect(deserialize(SERIALIZED_DATA)).toEqual(PLAIN_DATA)
  })
})
