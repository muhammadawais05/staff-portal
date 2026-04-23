import { GET_OPERATIONAL_ISSUES_COUNTERS } from './get-operational-issues-counters.staff.gql'
import { GetOperationalIssuesCountersQuery } from './get-operational-issues-counters.staff.gql.types'

export const createGetOperationalIssuesCountersMock = (
  data: GetOperationalIssuesCountersQuery = {
    operationalIssues: {
      counters: {
        all: 1,
        escalated: 1,
        mine: 1,
        team: 1,
        __typename: 'OperationalIssueCounters'
      },
      __typename: 'OperationalIssueConnection'
    }
  }
) => ({
  request: { query: GET_OPERATIONAL_ISSUES_COUNTERS },
  result: { data }
})
