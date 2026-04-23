import { encodeEntityId } from '@staff-portal/data-layer-service'

import { GET_TEAM_TASK_METRICS } from './get-team-task-metrics.staff.gql'
import { GET_TEAM_TASK_METRICS_CHART } from '../get-team-metrics-charts'

export const createTeamTaskMetricsMock = (
  ME_OVERDUE: string,
  ME_TODAY: string,
  ME_PENDING: string
) => [
  {
    request: { query: GET_TEAM_TASK_METRICS },
    result: {
      data: {
        viewer: {
          me: {
            id: '123',
            __typename: 'Staff'
          },
          playbookTeams: {
            nodes: [
              {
                id: encodeEntityId('1000', 'Test'),
                name: 'Project Manager Matchers',
                roles: {
                  totalCount: 8,
                  __typename: 'RoleOrClientOffsetConnection'
                },
                playbookTasks: {
                  overdueKpiChartDataUrl: 'http://testUrl.com',
                  viewerCounters: {
                    overdue: ME_OVERDUE,
                    today: ME_TODAY,
                    pending: ME_PENDING,
                    __typename: 'TasksCounters'
                  },
                  teamCounters: {
                    overdue: 16,
                    today: 20,
                    pending: 17,
                    __typename: 'TasksCounters'
                  },
                  __typename: 'PlaybookTaskConnection'
                },
                __typename: 'Team'
              }
            ],
            __typename: 'TeamConnectionNodes'
          },
          __typename: 'TeamConnection'
        }
      }
    }
  },
  {
    request: {
      query: GET_TEAM_TASK_METRICS_CHART
    },
    result: {
      data: [
        {
          id: 'role',
          values: {
            '2020-04-09': 1,
            '2020-04-10': 0,
            '2020-04-11': 0,
            '2020-04-12': 0,
            '2020-04-13': 1,
            '2020-04-14': 0
          }
        },
        {
          id: 'team',
          values: {
            '2020-04-09': 1,
            '2020-04-10': 0,
            '2020-04-11': 5,
            '2020-04-12': 5,
            '2020-04-13': 1.33,
            '2020-04-14': 2
          }
        }
      ],
      labels: {
        role: 'Goran Bokun',
        team: 'Project Manager Matchers Average'
      },
      x_axis_type: 'datetime',
      granularity: 'day',
      units: {
        role: 'tasks',
        team: 'tasks'
      },
      timezone_label: 'Eastern Time (US & Canada)',
      thresholds_dates: {
        red: {
          '2020-04-09': 10,
          '2020-04-10': 10,
          '2020-04-11': 10,
          '2020-04-12': 10,
          '2020-04-13': 10,
          '2020-04-14': 10
        },
        orange: {
          '2020-04-09': 2,
          '2020-04-10': 2,
          '2020-04-11': 2,
          '2020-04-12': 2,
          '2020-04-13': 2,
          '2020-04-14': 2
        },
        green: {
          '2020-04-09': 0,
          '2020-04-10': 0,
          '2020-04-11': 0,
          '2020-04-12': 0,
          '2020-04-13': 0,
          '2020-04-14': 0
        }
      },
      highlights: [],
      description: 'Overdue tasks'
    }
  }
]
