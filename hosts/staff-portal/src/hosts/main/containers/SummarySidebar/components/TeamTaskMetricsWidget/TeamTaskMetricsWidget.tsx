import React from 'react'
import { Typography, Grid } from '@toptal/picasso'
import { TASK_UPDATED } from '@staff-portal/tasks'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useRefetchOnPathChange } from '@staff-portal/navigation'

import { useGetTeamTaskMetrics } from '../../data/get-team-task-metrics'
import MetricsRow from '../MetricsRow'
import MetricsChart from '../MetricsChart'
import SidebarWidget from '../SidebarWidget'
import WidgetSectionLoader from '../WidgetSectionLoader'
import * as S from './styles'

const TeamTaskMetricsWidget = () => {
  const { data, loading, refetch } = useGetTeamTaskMetrics()

  useMessageListener(TASK_UPDATED, () => refetch())
  useRefetchOnPathChange([refetch])

  if (loading && !data) {
    return <WidgetSectionLoader rows={8} />
  }

  return (
    <>
      {data?.chartMetrics.map(
        ({ label, overdue, today, pending, chartUrl }) => (
          <SidebarWidget key={label} title={label} subTitle='Playbook Tasks'>
            <Grid spacing={0} css={S.row}>
              <Grid.Item small={6}>
                <Typography size='xsmall' weight='semibold' align='left'>
                  Status
                </Typography>
              </Grid.Item>
              <Grid.Item small={3}>
                <Typography size='xsmall' weight='semibold' align='right'>
                  You
                </Typography>
              </Grid.Item>
              <Grid.Item small={3}>
                <Typography size='xsmall' weight='semibold' align='right'>
                  Team
                </Typography>
              </Grid.Item>
            </Grid>
            <MetricsRow label='Overdue' item={overdue} />
            <MetricsRow label='Due Today' item={today} />
            <MetricsRow label='Pending' item={pending} />
            <MetricsChart chartUrl={chartUrl} />
          </SidebarWidget>
        )
      )}
    </>
  )
}

export default TeamTaskMetricsWidget
