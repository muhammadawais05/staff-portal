import { TreeNodeInterface } from '@toptal/picasso'

import {
  OperationalIssuesStaffTreeCardNodeFragment,
  OperationalIssuesStaffTreeTeamNodeFragment
} from './data/get-operational-issues-staff-tree'

export interface StaffMemberProperties {
  index: number
  selected: boolean
  highlighted: boolean
  disabled: boolean
  loading: boolean
}

export interface StaffMemberTreeCoordinates {
  index: number
  teamMemberIndex?: number
}

export type StaffTreeNode =
  | OperationalIssuesStaffTreeCardNodeFragment
  | OperationalIssuesStaffTreeTeamNodeFragment

export interface TreeNodeWithInfo extends TreeNodeInterface {
  children?: TreeNodeWithInfo[]
  info: StaffTreeNode & StaffMemberProperties
  memberProperties: StaffMemberProperties[]
}
