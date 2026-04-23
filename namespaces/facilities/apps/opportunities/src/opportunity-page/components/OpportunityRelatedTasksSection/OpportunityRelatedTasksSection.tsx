import { Container } from '@toptal/picasso'
import React from 'react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { TaskSource } from '@staff-portal/graphql/staff'
import { RelatedTasks } from '@staff-portal/tasks-lists'

interface Props {
  opportunityId: string
}

const OpportunityRelatedTasksSection = ({ opportunityId }: Props) => {
  const user = useGetCurrentUser()

  if (!user) {
    return null
  }

  return (
    <Container top='medium'>
      <RelatedTasks
        sectionVariant='withHeaderBar'
        nodeId={opportunityId}
        taskSource={TaskSource.RELATED_TASKS_OPPORTUNITY}
      />
    </Container>
  )
}

export default OpportunityRelatedTasksSection
