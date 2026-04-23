import React from 'react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { Operation } from '@staff-portal/operations'
import {
  ActivitySubtype,
  ACTIVITY_SUBTYPE_TEXT_MAPPING,
  EditActivityButton
} from '@staff-portal/activities'
import { TaskCardLayout, BlankIcon } from '@staff-portal/tasks'

import { TaskCardProps } from '../../../../types'
import { useGetActivity } from './data'
import { getActivityContentItems } from '../../utils'

const ActivityTaskCard = ({
  taskCardConfig: { entityId: activityId }
}: TaskCardProps) => {
  const { data: activity, loading } = useGetActivity(activityId)

  const user = useGetCurrentUser()

  return (
    <TaskCardLayout loading={!activity && loading}>
      {activity && (
        <>
          <TaskCardLayout.Header>
            <TaskCardLayout.Title title='Activity' icon={<BlankIcon />}>
              {
                ACTIVITY_SUBTYPE_TEXT_MAPPING[
                  activity.subtype as ActivitySubtype
                ]
              }
            </TaskCardLayout.Title>

            <Operation
              operation={activity.operations.updateActivity}
              render={disabled => (
                <EditActivityButton activity={activity} disabled={disabled} />
              )}
            />
          </TaskCardLayout.Header>

          <TaskCardLayout.Content
            oneColumn
            items={getActivityContentItems(activity, user?.timeZone?.value)}
          />

          <TaskCardLayout.Description title='Details'>
            {activity.details}
          </TaskCardLayout.Description>
        </>
      )}
    </TaskCardLayout>
  )
}

export default ActivityTaskCard
