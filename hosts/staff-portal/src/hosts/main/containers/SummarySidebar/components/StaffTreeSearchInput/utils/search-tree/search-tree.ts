import { Maybe } from '@staff-portal/graphql/staff'

import { TreeNodeWithInfo } from '../../../StaffTreeModal'
import { isPerson, createSelectedOffset } from '../../../StaffTreeModal/utils'
import { resetTree } from '../reset-tree'

const matches = (node: TreeNodeWithInfo, searchRegExp: RegExp) => {
  if (isPerson(node.info)) {
    return (
      searchRegExp.test(node.info.role.fullName) ||
      node.info.positions.some(position => searchRegExp.test(position))
    )
  }

  return node.info.members.edges.some(member =>
    searchRegExp.test(member.node.fullName)
  )
}

const matchTeam = ({
  node,
  searchRegExp,
  matchesCount,
  selectedIndex
}: {
  node: TreeNodeWithInfo
  searchRegExp: RegExp
  matchesCount: number
  selectedIndex: number
}) => {
  if (isPerson(node.info)) {
    throw new Error('Team node should be provided')
  }

  let updatedMatchesCount = matchesCount
  let selectedItemIndex: Maybe<number> = null

  node.info.members.edges.forEach((teamMember, index) => {
    if (searchRegExp.test(teamMember.node.fullName)) {
      const selected = selectedIndex === updatedMatchesCount

      if (selected) {
        selectedItemIndex = index
      }

      node.memberProperties[index] = {
        ...node.memberProperties[index],
        selected,
        highlighted: true
      }

      updatedMatchesCount++

      return
    }

    node.memberProperties[index] = {
      ...node.memberProperties[index],
      selected: false,
      highlighted: false
    }
  })

  if (selectedItemIndex !== null) {
    node.selected = true
    node.selectedOffset = createSelectedOffset(selectedItemIndex)
  }

  return { node, matchesCount: updatedMatchesCount }
}

const escapeRegExpCharacters = (input: string) =>
  // eslint-disable-next-line no-useless-escape
  input.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')

export const searchTree = ({
  treeData,
  searchValue,
  selectedIndex
}: {
  treeData: TreeNodeWithInfo
  searchValue: string
  selectedIndex: number
}) => {
  const resetTreeData = resetTree(treeData)

  if (!searchValue) {
    return { searchedTreeData: resetTreeData, matchesCount: 0 }
  }

  const searchRegExp = RegExp(escapeRegExpCharacters(searchValue), 'i')
  let matchesCount = 0
  const resolveMatches = (node: TreeNodeWithInfo) => {
    const newNode = { ...node }

    if (matches(newNode, searchRegExp)) {
      if (isPerson(newNode.info)) {
        const selected = selectedIndex === matchesCount

        newNode.selected = selected
        newNode.info.highlighted = true
        newNode.info.selected = selected
        matchesCount++

        newNode.children = newNode.children?.map(child => resolveMatches(child))

        return newNode
      }

      const { node: matchedTeamNode, matchesCount: updatedMatchesCount } =
        matchTeam({
          node: newNode,
          searchRegExp,
          matchesCount,
          selectedIndex
        })

      matchesCount = updatedMatchesCount
      matchedTeamNode.children = matchedTeamNode.children?.map(child =>
        resolveMatches(child)
      )

      return matchedTeamNode
    }

    newNode.selected = false
    newNode.selectedOffset = undefined
    newNode.children = newNode.children?.map(child => resolveMatches(child))

    return newNode
  }

  return { searchedTreeData: resolveMatches(resetTreeData), matchesCount }
}
