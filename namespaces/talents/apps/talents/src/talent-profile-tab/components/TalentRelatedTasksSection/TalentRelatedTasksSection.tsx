import React, { memo } from 'react'
import { SectionProps } from '@toptal/picasso/Section'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { TaskSource } from '@staff-portal/graphql/staff'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { TASK_UPDATED } from '@staff-portal/tasks'
import { RelatedTasks } from '@staff-portal/tasks-lists'

interface Props {
  talentId: string
  sectionVariant?: SectionProps['variant']
}

const TalentRelatedTasksSection = ({ talentId, sectionVariant }: Props) => {
  const user = useGetCurrentUser()

  if (!user) {
    return null
  }

  return (
    <RelatedTasks
      nodeId={talentId}
      taskSource={TaskSource.RELATED_TASKS_TALENT}
      listenedMessages={[TALENT_UPDATED, TASK_UPDATED]}
      sectionVariant={sectionVariant}
    />
  )
}

export default memo(TalentRelatedTasksSection)
