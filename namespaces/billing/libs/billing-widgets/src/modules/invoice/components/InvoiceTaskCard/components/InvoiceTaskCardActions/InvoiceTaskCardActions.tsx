import { Button, Menu } from '@toptal/picasso'
import { useSendEmailModal } from '@staff-portal/communication-send-email'
import { TaskCardLayout } from '@staff-portal/tasks'
import { useTranslation } from 'react-i18next'
import React, { SyntheticEvent, useCallback } from 'react'
import { snakeCase } from 'lodash-es'
import {
  ModalKey,
  StaffPortalTimelineButton
} from '@staff-portal/billing/src/@types/types'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import InlineActionsWrapper from '@staff-portal/billing/src/components/InlineActionsWrapper'

import { GetInvoiceTaskCardQuery } from '../../data/getInvoiceTaskCard.graphql.types'

const displayName = 'InvoiceTaskCardActions'

interface Props {
  invoice: Exclude<GetInvoiceTaskCardQuery['node'], null | undefined>
  handleOnClick: (e: SyntheticEvent<HTMLElement>) => void
  taskPlaybookIdentifier?: string
  taskStatus: string
  TimelineButton: StaffPortalTimelineButton
}

const InvoiceTaskCardActions = ({
  invoice,
  handleOnClick,
  taskPlaybookIdentifier,
  taskStatus,
  TimelineButton
}: Props) => {
  const { t: translate } = useTranslation('invoice')
  const {
    id,
    operations,
    subjectObject: { id: clientId }
  } = invoice
  const { showModal: showSendEmailModal } = useSendEmailModal({
    nodeId: clientId
  })
  const handleOnSendEmail = useCallback(
    () => showSendEmailModal(),
    [showSendEmailModal]
  )
  const addMemoActionAllowed =
    taskPlaybookIdentifier === 'issue_memo_for_invoice' &&
    // TODO:
    // Staff Portal's enum can be restored when testing issue has been fixed
    snakeCase(taskStatus) === 'pending'

  return (
    <TaskCardLayout.Actions>
      <InlineActionsWrapper>
        <TimelineButton nodeId={id} />
        <OperationWrapper operation={operations?.createTransferInvoice}>
          <Button
            data-testid={`${displayName}-addPayment`}
            onClick={handleOnClick}
            data-value={ModalKey.invoicePay}
            data-id={id}
            size='small'
          >
            {translate('taskCard.actions.addPayment')}
          </Button>
        </OperationWrapper>
        {addMemoActionAllowed && (
          <OperationWrapper
            operation={operations?.addMemorandumToCommercialDocument}
          >
            <Button
              data-testid={`${displayName}-addMemo`}
              onClick={handleOnClick}
              data-value={ModalKey.memorandumAdd}
              data-id={id}
              size='small'
            >
              {translate('taskCard.actions.addMemo')}
            </Button>
          </OperationWrapper>
        )}
      </InlineActionsWrapper>
      <TaskCardLayout.MoreButton>
        <Menu.Item
          data-testid={`${displayName}-sendEmail`}
          onClick={handleOnSendEmail}
          data-value='send-email'
          data-id={id}
        >
          {translate('taskCard.actions.sendEmail')}
        </Menu.Item>
      </TaskCardLayout.MoreButton>
    </TaskCardLayout.Actions>
  )
}

InvoiceTaskCardActions.displayName = displayName

export default InvoiceTaskCardActions
