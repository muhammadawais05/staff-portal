import { Operation as OperationType } from '@staff-portal/graphql/staff'
import React from 'react'
import { NodeType } from '@staff-portal/graphql'
import { SendEmailActionItem } from '@staff-portal/communication-send-email'

type Props = {
  jobEmailMessagingId: string
  operation?: OperationType
}

const SendJobEmailMenuItem = ({ jobEmailMessagingId, operation }: Props) => (
  <SendEmailActionItem
    componentType='menu-item'
    operation={operation}
    nodeId={jobEmailMessagingId}
    operationVariables={{
      nodeId: jobEmailMessagingId,
      nodeType: NodeType.EMAIL_MESSAGING_JOB,
      operationName: 'sendEmailTo'
    }}
    data-testid='send-job-email-menu-item'
  >
    Email Company
  </SendEmailActionItem>
)

export default SendJobEmailMenuItem
