import { Button } from '@toptal/picasso'
import { TaskCardLayout } from '@staff-portal/tasks'
import { snakeCase } from 'lodash-es'
import { useTranslation } from 'react-i18next'
import React, { SyntheticEvent } from 'react'
import {
  ModalKey,
  StaffPortalTimelineButton
} from '@staff-portal/billing/src/@types/types'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import InlineActionsWrapper from '@staff-portal/billing/src/components/InlineActionsWrapper'

import { GetPaymentTaskCardQuery } from '../../data/getPaymentTaskCard.graphql.types'

const displayName = 'PaymentTaskCardActions'

interface Props {
  payment: Exclude<GetPaymentTaskCardQuery['node'], null | undefined>
  handleOnClick: (e: SyntheticEvent<HTMLElement>) => void
  taskPlaybookIdentifier?: string
  taskStatus: string
  TimelineButton: StaffPortalTimelineButton
}

const PaymentTaskCardActions = ({
  payment,
  handleOnClick,
  taskPlaybookIdentifier,
  taskStatus,
  TimelineButton
}: Props) => {
  const { t: translate } = useTranslation('payment')
  const { id, operations } = payment
  const addMemoActionAllowed =
    taskPlaybookIdentifier === 'issue_memo_for_payment' &&
    // TODO:
    // Staff Portal's enum can be restored when testing issue has been fixed
    snakeCase(taskStatus) === 'pending'

  return (
    <TaskCardLayout.Actions>
      <InlineActionsWrapper>
        <TimelineButton nodeId={id} />
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
    </TaskCardLayout.Actions>
  )
}

PaymentTaskCardActions.displayName = displayName

export default PaymentTaskCardActions
