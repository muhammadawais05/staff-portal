import { resetTree } from './reset-tree'
import { createTreeNodeWithInfoMock } from '../../test-utils/create-tree-node-with-info-mock'

describe('reset-tree', () => {
  it('should reset modified tree', () => {
    const defaultTreeData = createTreeNodeWithInfoMock()
    const modifiedTreeData = createTreeNodeWithInfoMock(
      { selected: true },
      {
        selected: true,
        highlighted: true
      }
    )

    expect(resetTree(modifiedTreeData)).toEqual(defaultTreeData)
  })
})
