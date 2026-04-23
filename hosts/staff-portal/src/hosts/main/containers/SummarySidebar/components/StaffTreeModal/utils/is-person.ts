import { StaffTreeNode } from '../types'
import { OperationalIssuesStaffTreeCardNodeFragment } from '../data/get-operational-issues-staff-tree'

const isPerson = (
  node: StaffTreeNode
): node is OperationalIssuesStaffTreeCardNodeFragment =>
  (node as OperationalIssuesStaffTreeCardNodeFragment).positions !== undefined

export default isPerson
