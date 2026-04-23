import { Container } from '@toptal/picasso'
import React from 'react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { TaskSource } from '@staff-portal/graphql/staff'
import { RelatedTasks } from '@staff-portal/tasks-lists'

interface Props {
  jobId: string
}

const JobRelatedTasksSection = ({ jobId }: Props) => {
  const user = useGetCurrentUser()

  if (!user) {
    return null
  }

  return (
    <Container top='medium'>
      <RelatedTasks
        sectionVariant='withHeaderBar'
        nodeId={jobId}
        taskSource={TaskSource.RELATED_TASKS_JOB}
        listenedMessages={[JOB_UPDATED]}
      />
    </Container>
  )
}

export default JobRelatedTasksSection
