import { TreeNodeWithInfo, StaffMemberTreeCoordinates } from '../types'
import isPerson from './is-person'
import createSelectedOffset from './create-selected-offset'

type Options = {
  node: TreeNodeWithInfo
  loadingNode?: StaffMemberTreeCoordinates
}

const lockNode = (
  node: TreeNodeWithInfo,
  { index, teamMemberIndex }: StaffMemberTreeCoordinates
) => {
  const newNode = { ...node }

  if (isPerson(newNode.info)) {
    const selected = newNode.info.index === index

    newNode.selected = selected
    newNode.info.disabled = true
    newNode.info.loading = selected

    return newNode
  }

  if (newNode.info.index === index) {
    if (teamMemberIndex === undefined) {
      throw new Error(
        'Team was specified, but the team member index was not provided'
      )
    }

    newNode.selected = true
    newNode.selectedOffset = createSelectedOffset(teamMemberIndex)
    newNode.memberProperties = newNode.memberProperties.map(
      (item, memberIndex) => ({
        ...item,
        disabled: true,
        loading: memberIndex === teamMemberIndex
      })
    )

    return newNode
  }

  newNode.selected = false
  newNode.selectedOffset = undefined
  newNode.memberProperties = newNode.memberProperties.map(item => ({
    ...item,
    disabled: true,
    loading: false
  }))

  return newNode
}

const unlockNode = (node: TreeNodeWithInfo) => {
  const newNode = { ...node }

  newNode.info.disabled = false
  newNode.info.loading = false
  if (!isPerson(newNode.info)) {
    newNode.memberProperties = newNode.memberProperties.map(item => ({
      ...item,
      disabled: false,
      loading: false
    }))
  }

  return newNode
}

const setLockedTreeStatus = (
  locked: boolean,
  { node, loadingNode }: Options
) => {
  const updateNode = (treeNode: TreeNodeWithInfo) => {
    if (locked) {
      if (!loadingNode) {
        throw new Error(
          'When tree is locked, the loading node information has to be provided'
        )
      }

      const newNode = lockNode(treeNode, loadingNode)

      newNode.children = newNode.children?.map(child => updateNode(child))

      return newNode
    }

    const newNode = unlockNode(treeNode)

    newNode.children = newNode.children?.map(child => updateNode(child))

    return newNode
  }

  return updateNode(node)
}

/**
 * Tree is locked when all nodes are "disabled" (one of the nodes can be "loading"),
 * so the user can not interact with it.
 */
const lockTree = (options: Options) => setLockedTreeStatus(true, options)

/**
 * Tree is unlocked when nodes are not "disabled" or "loading", so the user can
 * interact with it.
 */
const unlockTree = (options: Options) => setLockedTreeStatus(false, options)

export { lockTree, unlockTree }
