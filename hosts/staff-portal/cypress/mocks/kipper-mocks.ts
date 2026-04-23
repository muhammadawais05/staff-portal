import { LineChartResponse } from '@staff-portal/charts'

export const kipperChartsMock = (
  data?: Partial<LineChartResponse>
): LineChartResponse => ({
  data: [
    {
      id: 'role',
      values: {
        '2021-08-12': 1.0,
        '2021-08-13': 0.0,
        '2021-08-14': 3.0,
        '2021-08-15': 3.0,
        '2021-08-16': 3.0,
        '2021-08-17': 8.0
      }
    },
    {
      id: 'team',
      values: {
        '2021-08-12': 1.0,
        '2021-08-13': 1.33,
        '2021-08-14': 1.5,
        '2021-08-15': 2.0,
        '2021-08-16': 2.0,
        '2021-08-17': 1.67
      }
    }
  ],
  labels: {
    role: 'Andi Blackwell',
    team: 'Project Manager Screeners Average'
  },
  x_axis_type: 'datetime',
  granularity: 'day',
  units: { role: 'tasks', team: 'tasks' },
  timezone_label: 'America/New_York',
  thresholds_dates: {
    red: {
      '2021-08-12': 10.0,
      '2021-08-13': 10.0,
      '2021-08-14': 10.0,
      '2021-08-15': 10.0,
      '2021-08-16': 10.0,
      '2021-08-17': 10.0
    },
    orange: {
      '2021-08-12': 2.0,
      '2021-08-13': 2.0,
      '2021-08-14': 2.0,
      '2021-08-15': 2.0,
      '2021-08-16': 2.0,
      '2021-08-17': 2.0
    },
    green: {
      '2021-08-12': 0.0,
      '2021-08-13': 0.0,
      '2021-08-14': 0.0,
      '2021-08-15': 0.0,
      '2021-08-16': 0.0,
      '2021-08-17': 0.0
    }
  },
  highlights: [],
  description: 'Overdue tasks',
  ...data
})
