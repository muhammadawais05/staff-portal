import { getAvailableItemsFilter } from './get-available-items-filter'

jest.mock('@staff-portal/data-layer-service')

const options = [
  { text: 'foo', value: 'foo' },
  { text: 'bar', value: 'bar' },
  { text: 'baz', value: 'baz' }
]

describe('#getAvailableItemsFilter', () => {
  it('returns proper values', () => {
    expect(getAvailableItemsFilter()(options)).toStrictEqual(options)
    expect(getAvailableItemsFilter([])(options)).toStrictEqual(options)
    expect(getAvailableItemsFilter([], '')(options)).toStrictEqual(options)
    expect(getAvailableItemsFilter(undefined, '')(options)).toStrictEqual(
      options
    )

    expect(
      getAvailableItemsFilter(['foo', 'bar'], 'foobar')(options)
    ).toStrictEqual([])

    expect(getAvailableItemsFilter(['foo', 'bar'])(options)).toStrictEqual([
      {
        text: 'baz',
        value: 'baz'
      }
    ])

    expect(getAvailableItemsFilter([], 'oo')(options)).toStrictEqual([
      { text: 'foo', value: 'foo' }
    ])

    expect(getAvailableItemsFilter(['foo'], 'ba')(options)).toStrictEqual([
      {
        text: 'bar',
        value: 'bar'
      },
      {
        text: 'baz',
        value: 'baz'
      }
    ])
  })
})
