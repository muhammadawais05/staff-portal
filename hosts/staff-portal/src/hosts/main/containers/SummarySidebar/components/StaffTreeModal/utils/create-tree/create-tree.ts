import { StaffTreeNode, TreeNodeWithInfo } from '../../types'
import isPerson from '../is-person'

const defaultNodeProperties = {
  selected: false,
  disabled: false,
  children: []
}

const defaultStaffMemberProperties = {
  selected: false,
  highlighted: false,
  disabled: false,
  loading: false
}

const setNodeSelected = (node: TreeNodeWithInfo) => {
  node.selected = true

  return node
}

const createTree = (data: StaffTreeNode[]) => {
  const chartNodes: TreeNodeWithInfo[] = data.map((item, index) => {
    if (isPerson(item)) {
      return {
        id: `${item.role.id}:${index}`,
        ...defaultNodeProperties,
        info: {
          ...defaultStaffMemberProperties,
          ...item,
          index
        },
        memberProperties: []
      }
    }

    return {
      id: String(index),
      ...defaultNodeProperties,
      info: {
        ...defaultStaffMemberProperties,
        ...item,
        index
      },
      memberProperties: item.members.edges.map((_, edgeIndex) => ({
        ...defaultStaffMemberProperties,
        index: edgeIndex
      }))
    }
  })

  const getChildrenForNode = (node: TreeNodeWithInfo) => {
    const children: TreeNodeWithInfo[] = chartNodes.filter(
      ({ info: { parentIndex } }) => parentIndex === node.info.index
    )

    children.forEach((child, index) => {
      children[index].children = getChildrenForNode(child)
    })

    return children
  }

  const root = chartNodes.find(
    ({ info: { parentIndex } }) => parentIndex === null
  )

  if (!root) {
    throw new Error('Unable to detect root.')
  }

  root.children = getChildrenForNode(root)

  return setNodeSelected(root)
}

export default createTree
