import { Operation as OperationType } from '@staff-portal/graphql/staff'
import React, { PropsWithChildren } from 'react'
import { ActionItemProps } from '@staff-portal/ui'
import { OperationActionItem } from '@staff-portal/operations'

import { useSendEmailModal } from '../../hooks/use-send-email-modal'
import { SendGeneralEmailModalProps } from '../SendGeneralEmailModal'

type Props = ActionItemProps &
  Omit<SendGeneralEmailModalProps, 'hideModal'> & {
    skipOperationCheck?: boolean
    operation?: OperationType
    'data-testid'?: string
  }

const SendEmailActionItem = ({
  children = 'Send Email',
  operation,
  nodeId,
  preselectedEmailTemplateId,
  operationVariables,
  skipOperationCheck,
  onCompleted,
  'data-testid': dataTestId = 'send-email-action-item',
  ...props
}: PropsWithChildren<Props>) => {
  const { showModal } = useSendEmailModal({
    nodeId,
    preselectedEmailTemplateId,
    operationVariables,
    onCompleted
  })

  return (
    <OperationActionItem
      {...props}
      operation={operation}
      skipOperationCheck={skipOperationCheck}
      onClick={showModal}
      data-testid={dataTestId}
    >
      {children}
    </OperationActionItem>
  )
}

export default SendEmailActionItem
