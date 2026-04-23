import React from 'react'
import { TaskCardLayout } from '@staff-portal/tasks'

import { JobFragment } from '../../data'

export interface Props {
  job: JobFragment
}

const JobTaskCardDescription = ({ job: { description } }: Props) => {
  if (!description) {
    return null
  }

  return (
    <TaskCardLayout.Description title='Job Description'>
      <TaskCardLayout.DescriptionFormatter description={description} />
    </TaskCardLayout.Description>
  )
}

export default JobTaskCardDescription
