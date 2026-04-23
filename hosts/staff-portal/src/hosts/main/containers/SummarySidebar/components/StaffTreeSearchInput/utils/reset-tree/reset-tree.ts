import { TreeNodeWithInfo } from '../../../StaffTreeModal'

export const resetTree = (node: TreeNodeWithInfo) => {
  const newNode = { ...node }

  newNode.info.selected = false
  newNode.info.highlighted = false
  newNode.selected = false
  newNode.memberProperties = newNode.memberProperties.map(item => ({
    ...item,
    selected: false,
    highlighted: false
  }))
  newNode.children = newNode.children?.map(child => resetTree(child))

  return newNode
}
