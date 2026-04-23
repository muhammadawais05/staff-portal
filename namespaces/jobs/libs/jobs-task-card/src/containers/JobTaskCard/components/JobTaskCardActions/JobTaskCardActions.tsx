import React from 'react'
import { TaskCardLayout, TimelineButton } from '@staff-portal/tasks'

import JobTaskCardMainAction from '../JobTaskCardMainAction'
import JobTaskCardMoreActions from '../JobTaskCardMoreActions'
import { TaskJob } from '../../types'

export interface Props {
  job: TaskJob
}

const JobTaskCardActions = ({ job }: Props) => {
  return (
    <TaskCardLayout.Actions>
      <TimelineButton nodeId={job.id} />

      <JobTaskCardMainAction job={job} />
      <JobTaskCardMoreActions job={job} />
    </TaskCardLayout.Actions>
  )
}

export default JobTaskCardActions
