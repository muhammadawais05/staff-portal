import { TreeNodeWithInfo } from '../../StaffTreeModal'

export const createTreeNodeWithInfoMock = (
  partialNode: Partial<TreeNodeWithInfo> = {},
  partialInfo: Partial<TreeNodeWithInfo['info']> = {}
): TreeNodeWithInfo => ({
  id: '123',
  selected: false,
  selectedOffset: undefined,
  disabled: false,
  children: [],
  info: {
    index: 0,
    selected: false,
    highlighted: false,
    disabled: false,
    loading: false,
    issuesCount: 0,
    parentIndex: 0,
    positions: [],
    role: { id: '', fullName: '' },
    ...partialInfo
  },
  memberProperties: [],
  ...partialNode
})
