import { createOperationalIssueMock } from '../operational-issue-fragment/mocks'
import { OperationalIssueFragment } from '../operational-issue-fragment/operational-issue-fragment.staff.gql.types'
import { GET_OPERATIONAL_ISSUES } from './get-operational-issues.staff.gql'

export const createGetOperationalIssuesDataMocks = (
  operationalIssues: Partial<OperationalIssueFragment>[] = []
) => ({
  operationalIssues: {
    totalCount: operationalIssues.length,
    nodes: operationalIssues.map((operationalIssue, index) =>
      createOperationalIssueMock(index, operationalIssue)
    ),
    __typename: 'OperationalIssueConnection'
  },
  __typename: 'Query'
})

export const createGetOperationalIssuesMock = (
  operationalIssues: Partial<OperationalIssueFragment>[] = []
) => ({
  request: { query: GET_OPERATIONAL_ISSUES },
  newData: () => ({
    data: createGetOperationalIssuesDataMocks(operationalIssues)
  })
})
