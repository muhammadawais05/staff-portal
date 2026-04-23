export const getOperationalIssuesCountersResponse = () => ({
  data: {
    operationalIssues: {
      counters: {
        all: 123,
        escalated: 123,
        mine: 0,
        team: null,
        __typename: 'OperationalIssueCounters'
      },
      __typename: 'OperationalIssueConnection'
    }
  }
})
