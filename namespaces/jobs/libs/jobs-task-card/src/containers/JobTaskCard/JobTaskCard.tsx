import React from 'react'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { TaskCardLayout, BlankIcon } from '@staff-portal/tasks'
import { TaskCardProps } from '@staff-portal/tasks-cards'
import { JOB_UPDATED, JobType } from '@staff-portal/jobs'

import { JOB_TYPE_ICON_MAPPING } from './config'
import { getJobContentItems } from './utils'
import JobTaskCardActions from './components/JobTaskCardActions'
import JobTaskCardDescription from './components/JobTaskCardDescription'
import JobTaskCardSummary from './components/JobTaskCardSummary'
import { useGetJob } from './data'

const renderJobIcon = (jobType: string) => {
  const JobIcon = JOB_TYPE_ICON_MAPPING[jobType as JobType] ?? BlankIcon

  return <JobIcon />
}

const JobTaskCard = ({
  taskCardConfig: {
    title: taskCardTitle,
    subtitle: taskCardSubtitle,
    entityId: jobId
  }
}: TaskCardProps) => {
  const { data: job, loading, refetch } = useGetJob(jobId)
  const user = useGetCurrentUser()

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => id === jobId && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  return (
    <TaskCardLayout loading={!job && loading}>
      {job && (
        <>
          <TaskCardLayout.Header>
            <TaskCardLayout.Title
              title={taskCardTitle}
              icon={renderJobIcon(job.jobType)}
              link={job.webResource.url}
            >
              {taskCardSubtitle}
            </TaskCardLayout.Title>

            <JobTaskCardActions job={job} />
          </TaskCardLayout.Header>

          <JobTaskCardSummary job={job} />

          <TaskCardLayout.Content
            items={getJobContentItems(job, user?.timeZone?.value)}
          />

          <JobTaskCardDescription job={job} />
        </>
      )}
    </TaskCardLayout>
  )
}

export default JobTaskCard
