import { Operation as OperationType } from '@staff-portal/graphql/staff'
import React from 'react'
import { NodeType } from '@staff-portal/graphql'
import { SendEmailActionItem } from '@staff-portal/communication-send-email'
import { ActionItemProps } from '@staff-portal/ui'

type Props = ActionItemProps & {
  emailMessagingEngagementClientId: string
  operation?: OperationType
}

const SendEngagementClientEmailItem = ({
  emailMessagingEngagementClientId,
  ...props
}: Props) => (
  <SendEmailActionItem
    {...props}
    nodeId={emailMessagingEngagementClientId}
    operationVariables={{
      nodeId: emailMessagingEngagementClientId,
      nodeType: NodeType.EMAIL_MESSAGING_ENGAGEMENT_CLIENT,
      operationName: 'sendEmailTo'
    }}
    data-testid='send-engagement-client-email-item'
  >
    Email Company
  </SendEmailActionItem>
)

export default SendEngagementClientEmailItem
