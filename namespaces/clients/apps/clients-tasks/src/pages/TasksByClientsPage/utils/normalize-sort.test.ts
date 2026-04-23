import { normalizeSort } from './normalize-sort'

describe('normalizeSort', () => {
  it.each([
    [{}, {}],
    [{ filter: {} }, { filter: {} }],
    [{ sort_target: {}, sort_order: {} }, { sort: { target: {}, order: {} } }],
    [{ sort: {} }, { sort: {} }]
  ])('normalizes %s', (value, expected) => {
    const normalizedValue = normalizeSort(
      value as unknown as Record<string, string>
    )

    expect(normalizedValue).toMatchObject(expected)
  })
})
