import { Operation as OperationType } from '@staff-portal/graphql/staff'
import React from 'react'
import { NodeType } from '@staff-portal/graphql'
import { SendEmailActionItem } from '@staff-portal/communication-send-email'
import { ActionItemProps } from '@staff-portal/ui'

type Props = ActionItemProps & {
  emailMessagingEngagementTalentId: string
  operation?: OperationType
}

const SendEngagementTalentEmailItem = ({
  emailMessagingEngagementTalentId,
  ...props
}: Props) => (
  <SendEmailActionItem
    {...props}
    nodeId={emailMessagingEngagementTalentId}
    operationVariables={{
      nodeId: emailMessagingEngagementTalentId,
      nodeType: NodeType.EMAIL_MESSAGING_ENGAGEMENT_TALENT,
      operationName: 'sendEmailTo'
    }}
    data-testid='send-engagement-talent-email-item'
  >
    Email Talent
  </SendEmailActionItem>
)

export default SendEngagementTalentEmailItem
