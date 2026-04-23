import { useMemo } from 'react'
import { gql, useGetData, BATCH_KEY } from '@staff-portal/data-layer-service'

import { GetTeamTaskMetricsDocument } from './get-team-task-metrics.staff.gql.types'
import { SUMMARY_SIDEBAR_BATCH_KEY } from '../../config'
import { MetricsResult, MetricsData } from './types'

const BOTTOM_ABERRATION = 0.8
const TOP_ABERRATION = 1.2

const createMetricsData = (
  viewerCounter: number,
  teamCounter: number,
  totalCount: number
): MetricsData => {
  const ratio =
    Math.round((teamCounter / totalCount + Number.EPSILON) * 100) / 100

  return {
    count: viewerCounter,
    ratio,
    isAbove: viewerCounter > ratio * TOP_ABERRATION,
    isBelow: viewerCounter <= ratio * BOTTOM_ABERRATION
  }
}

export const GET_TEAM_TASK_METRICS = gql`
  query GetTeamTaskMetrics {
    viewer {
      playbookTeams {
        nodes {
          id
          name
          roles {
            totalCount
          }
          playbookTasks {
            overdueKpiChartDataUrl
            viewerCounters {
              overdue
              today
              pending
            }
            teamCounters {
              overdue
              today
              pending
            }
          }
        }
      }
    }
  }
`

export const useGetTeamTaskMetrics = () => {
  const { data, ...restOptions } = useGetData(
    GetTeamTaskMetricsDocument,
    'viewer'
  )(undefined, {
    throwOnError: true,
    context: { [BATCH_KEY]: SUMMARY_SIDEBAR_BATCH_KEY }
  })

  const chartMetricsData = useMemo(() => {
    if (!data) {
      return
    }

    return {
      chartMetrics: data.playbookTeams.nodes.map(
        ({
          name,
          roles: { totalCount },
          playbookTasks: {
            overdueKpiChartDataUrl,
            viewerCounters,
            teamCounters
          }
        }): MetricsResult => ({
          label: name,
          chartUrl: overdueKpiChartDataUrl,
          overdue: createMetricsData(
            viewerCounters.overdue,
            teamCounters.overdue,
            totalCount
          ),
          pending: createMetricsData(
            viewerCounters.pending,
            teamCounters.pending,
            totalCount
          ),
          today: createMetricsData(
            viewerCounters.today,
            teamCounters.today,
            totalCount
          )
        })
      )
    }
  }, [data])

  return { ...restOptions, data: chartMetricsData }
}
