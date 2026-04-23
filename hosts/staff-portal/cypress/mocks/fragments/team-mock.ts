import { Team } from '@staff-portal/graphql/staff'

import { hiddenOperationMock } from '../hidden-operation-mock'

export const teamMock = (team?: Partial<Team>): Team => ({
  id: '1',
  name: 'Team 1',
  roles: {
    totalCount: 2,
    nodes: []
  },
  playbookTasks: {
    overdueKpiChartDataUrl:
      'https://kipper-staging.toptal.net/api/v1/chart.json',
    viewerCounters: {
      overdue: 1,
      today: 2,
      pending: 3
    },
    teamCounters: {
      overdue: 2,
      today: 2,
      pending: 6
    },
    totalCount: 1,
    nodes: []
  },
  operations: {
    updateTeam: hiddenOperationMock()
  } as unknown as Team['operations'],
  emailTracking: false,
  webResource: {
    text: 'Team',
    url: 'https://toptal.com'
  },
  ...team
})
