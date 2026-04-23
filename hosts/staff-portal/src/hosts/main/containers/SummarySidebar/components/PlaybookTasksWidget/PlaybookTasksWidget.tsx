import React, { useMemo } from 'react'
// eslint-disable-next-line
import { Button, Link as PicassoLink } from '@toptal/picasso'
import { Link, useRefetchOnPathChange } from '@staff-portal/navigation'
import { PlaybookName, TaskFilterStatus } from '@staff-portal/graphql/staff'
import { TASK_UPDATED } from '@staff-portal/tasks'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { getTasksPath } from '@staff-portal/routes'
import { decodeEntityId } from '@staff-portal/data-layer-service'
import { useGetCurrentUser } from '@staff-portal/current-user'

import { useGetPlaybookTasksCounters } from '../../data/get-play-book-tasks-counters'
import CounterRow from '../CounterRow'
import SidebarWidget from '../SidebarWidget'
import WidgetSectionLoader from '../WidgetSectionLoader'
import StripeRow from '../StripeRow'

const PlaybookTasksWidget = () => {
  const currentUser = useGetCurrentUser()
  const { data, loading, refetch } = useGetPlaybookTasksCounters()
  const tasksUrl = useMemo(
    () =>
      getTasksPath({
        performerId: currentUser && decodeEntityId(currentUser.id).id,
        playbooks: Object.keys(PlaybookName) as PlaybookName[],
        statuses: [TaskFilterStatus.PENDING, TaskFilterStatus.COMPLETED_TODAY]
      }),
    [currentUser]
  )

  useMessageListener(TASK_UPDATED, () => refetch())
  useRefetchOnPathChange([refetch])

  if (loading && !data) {
    return <WidgetSectionLoader rows={4} hasButton />
  }

  return (
    <SidebarWidget title='Your Playbook Tasks'>
      <StripeRow>
        <CounterRow name='Overdue' count={data?.overdue} />
      </StripeRow>
      <StripeRow>
        <CounterRow name='Due today' count={data?.today} />
      </StripeRow>
      <StripeRow>
        <CounterRow name='Pending' count={data?.pending} />
      </StripeRow>
      <SidebarWidget.BottomContainer>
        <Button
          as={Link as typeof PicassoLink}
          href={tasksUrl}
          variant='secondary'
          size='small'
          noUnderline
        >
          View Tasks
        </Button>
      </SidebarWidget.BottomContainer>
    </SidebarWidget>
  )
}

export default PlaybookTasksWidget
