import { getHighlightItemTypeCount } from './get-highlight-item-type-count'

describe('getHighlightItemTypeCount', () => {
  it('returns highlight items count', () => {
    expect(getHighlightItemTypeCount([], [])).toBe(0)
    expect(
      getHighlightItemTypeCount([{ id: 'item-id', type: 'certification' }], [])
    ).toBe(0)
    expect(getHighlightItemTypeCount([], ['certification'])).toBe(0)
    expect(
      getHighlightItemTypeCount(
        [{ id: 'item-id', type: 'education' }],
        ['certification']
      )
    ).toBe(0)
    expect(
      getHighlightItemTypeCount(
        [
          { id: 'item-id-1', type: 'education' },
          { id: 'item-id-2', type: 'certification' }
        ],
        ['certification']
      )
    ).toBe(1)
    expect(
      getHighlightItemTypeCount(
        [
          { id: 'item-id-1', type: 'education' },
          { id: 'item-id-2', type: 'certification' }
        ],
        ['certification', 'employment']
      )
    ).toBe(1)
    expect(
      getHighlightItemTypeCount(
        [
          { id: 'item-id-1', type: 'education' },
          { id: 'item-id-2', type: 'employment', description_items: ['test'] }
        ],
        ['certification', 'employment']
      )
    ).toBe(1)
    expect(
      getHighlightItemTypeCount(
        [
          { id: 'item-id-1', type: 'education' },
          {
            id: 'item-id-2',
            type: 'employment',
            description_items: ['test', 'some']
          }
        ],
        ['certification', 'employment']
      )
    ).toBe(2)
    expect(
      getHighlightItemTypeCount(
        [
          { id: 'item-id-1', type: 'education' },
          {
            id: 'item-id-2',
            type: 'employment',
            description_items: ['test', 'some']
          }
        ],
        ['certification', 'education', 'employment']
      )
    ).toBe(3)
  })
})
