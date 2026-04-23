import React from 'react'
import {
  TaskCardLayout,
  TaskWithOptionalMetadata,
  TimelineButton
} from '@staff-portal/tasks'
import { ACTIVITY_UPDATED, AddActivityButton } from '@staff-portal/activities'
import { useLazyQuery } from '@staff-portal/data-layer-service'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { Operation } from '@staff-portal/operations'

import { TaskCardCompanyFragment } from '../../data/company-task-card-fragment'
import CompanyTaskCardMainAction from '../CompanyTaskCardMainAction'
import CompanyTaskCardMoreActions from '../CompanyTaskCardMoreActions'
import { GetTaskDocument } from './data'

export interface Props {
  company: TaskCardCompanyFragment
  task: TaskWithOptionalMetadata
}

const CompanyTaskCardActions = ({ company, task }: Props) => {
  const [refetch] = useLazyQuery(GetTaskDocument, {
    variables: { taskId: task.id }
  })

  useMessageListener(ACTIVITY_UPDATED, refetch)

  return (
    <TaskCardLayout.Actions>
      <TimelineButton nodeId={company.id} />

      <Operation
        operation={task.operations?.createActivity}
        render={disabled => (
          <AddActivityButton subjectId={task.id} disabled={disabled} />
        )}
      />

      <CompanyTaskCardMainAction
        company={company}
        playbookTemplateId={task.playbookTemplate?.id}
        preselectedEmailTemplateId={
          task.clientEmailMessagingDefaultEmailTemplate?.id
        }
      />

      <CompanyTaskCardMoreActions company={company} />
    </TaskCardLayout.Actions>
  )
}

export default CompanyTaskCardActions
