export const getTeamTaskMetricsResponse = () => ({
  data: {
    viewer: {
      playbookTeams: {
        nodes: [],
        __typename: 'TeamConnection'
      },
      __typename: 'Viewer'
    }
  }
})
