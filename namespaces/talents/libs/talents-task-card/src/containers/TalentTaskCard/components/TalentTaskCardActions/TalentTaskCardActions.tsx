import React from 'react'
import { TaskCardLayout, TimelineButton } from '@staff-portal/tasks'
import { SendEmailActionItem } from '@staff-portal/communication-send-email'

export interface Props {
  talentId: string
}

const TalentTaskCardActions = ({ talentId }: Props) => {
  return (
    <TaskCardLayout.Actions>
      <TimelineButton nodeId={talentId} />

      <SendEmailActionItem
        nodeId={talentId}
        componentType='button'
        skipOperationCheck
        size='small'
      />
    </TaskCardLayout.Actions>
  )
}

export default TalentTaskCardActions
