import { INITIAL_SCALE, BORDER_OVERLAY_OFFSET_PX } from '../config'
import { TreeNodeWithInfo } from '../types'

export const centerOnRootWithOffset = (
  tree: TreeNodeWithInfo,
  containerHeight: number
) => {
  const modifiedTree = { ...tree }

  modifiedTree.selected = true
  modifiedTree.selectedOffset = {
    x: 0,
    y: Math.round(
      (containerHeight / 2) * (1 / INITIAL_SCALE) - BORDER_OVERLAY_OFFSET_PX
    )
  }

  return modifiedTree
}
