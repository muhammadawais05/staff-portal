import { GET_OPERATIONAL_ISSUES_STAFF_TREE } from './get-operational-issues-staff-tree.staff.gql'
import { StaffTreeNode } from '../../types'

export const createGetOperationalIssuesStaffTreeMock = (
  nodes: (StaffTreeNode & {
    __typename: string
    role: { __typename: string }
  })[] = []
) => ({
  request: {
    query: GET_OPERATIONAL_ISSUES_STAFF_TREE
  },
  result: {
    data: {
      operationalIssuesStaffTree: {
        nodes,
        __typename: 'OperationalIssuesStaffTreeNodeConnection'
      }
    }
  }
})

export const createGetOperationalIssuesStaffTreeFailedMock = () => ({
  request: { query: GET_OPERATIONAL_ISSUES_STAFF_TREE },
  error: new Error('Network error occurred')
})
