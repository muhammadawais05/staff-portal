import React from 'react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { Container } from '@toptal/picasso'
import { CLIENT_UPDATED, INTERNAL_TEAM_UPDATE } from '@staff-portal/clients'
import { TaskSource } from '@staff-portal/graphql/staff'
import { RelatedTasks } from '@staff-portal/tasks-lists'

export interface Props {
  companyId: string
}

const RelatedTasksSection = ({ companyId }: Props) => {
  const user = useGetCurrentUser()

  if (!user) {
    return null
  }

  return (
    <Container top='medium'>
      <RelatedTasks
        nodeId={companyId}
        taskSource={TaskSource.RELATED_TASKS_COMPANY_PROFILE}
        listenedMessages={[CLIENT_UPDATED, INTERNAL_TEAM_UPDATE]}
        sectionVariant='withHeaderBar'
      />
    </Container>
  )
}

export default RelatedTasksSection
