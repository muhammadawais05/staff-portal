import { getItemId, getItemLabel, prepareTaskTags, diffTagLists } from '.'

describe('DetailsTaskCard/utils', () => {
  const firstTagNode = {
    id: 'ID1',
    value: 'test1',
    name: 'First'
  }

  const secondTagNode = {
    id: 'ID2',
    value: 'test2',
    name: 'Second'
  }

  it('checks getItemId', () => {
    expect(getItemId({ value: 'test' })).toBeNull()
    expect(getItemId({ value: 'test', node: { id: 'ID' } })).toBe('ID')
  })

  it('checks getItemLabel', () => {
    expect(getItemLabel({ value: 'test' })).toBe('')
    expect(getItemLabel({ value: 'test', label: 'Hello world!' })).toBe(
      'Hello world!'
    )
  })

  it('checks diffTagLists', () => {
    expect(diffTagLists([], [])).toBeUndefined()

    expect(diffTagLists([firstTagNode], [firstTagNode])).toBeUndefined()

    expect(
      diffTagLists([firstTagNode, secondTagNode], [firstTagNode])
    ).toBeUndefined()

    expect(diffTagLists([firstTagNode], [firstTagNode, secondTagNode])).toEqual(
      secondTagNode
    )
  })

  it('checks prepareTaskTags', () => {
    expect(prepareTaskTags()).toBeUndefined()

    expect(prepareTaskTags([])).toEqual([])

    expect(prepareTaskTags([firstTagNode])).toEqual([
      {
        key: 'ID1',
        node: firstTagNode,
        label: firstTagNode.name
      }
    ])

    expect(prepareTaskTags([firstTagNode, secondTagNode])).toEqual([
      {
        key: 'ID1',
        node: firstTagNode,
        label: firstTagNode.name
      },
      {
        key: 'ID2',
        node: secondTagNode,
        label: secondTagNode.name
      }
    ])
  })
})
