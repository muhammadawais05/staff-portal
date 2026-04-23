import { Button } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { SyntheticEvent, memo } from 'react'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import InlineActionsWrapper from '@staff-portal/billing/src/components/InlineActionsWrapper'

import { TransferOperationsFragment } from '../../../__fragments__/transferOperationsFragment.graphql.types'

const displayName = 'TableRowActions'

interface Props extends TransferOperationsFragment {
  onTransferActionClick: (e: SyntheticEvent<HTMLElement>) => void
  id: number
}

const TableRowActions = ({
  operations: {
    postponeTransfer,
    payTransfer,
    failTransfer,
    claimTransferRefund,
    cancelTransfer,
    rollbackTransfer
  },
  id,
  onTransferActionClick
}: Props) => {
  const { t: translate } = useTranslation('transfers')

  return (
    <InlineActionsWrapper left='small'>
      <OperationWrapper operation={rollbackTransfer}>
        <Button
          onClick={onTransferActionClick}
          data-value={ModalKey.transferRollback}
          data-node-id={id}
          data-testid='rollback-transfer'
          variant='secondary'
          size='small'
        >
          {translate('actions.rollback')}
        </Button>
      </OperationWrapper>
      <OperationWrapper operation={payTransfer}>
        <Button
          onClick={onTransferActionClick}
          data-value={ModalKey.transferPay}
          data-node-id={id}
          data-testid='pay-transfer'
          variant='positive'
          size='small'
        >
          {translate('actions.pay')}
        </Button>
      </OperationWrapper>
      <OperationWrapper operation={failTransfer}>
        <Button
          onClick={onTransferActionClick}
          data-value={ModalKey.transferMarkFailed}
          data-node-id={id}
          data-testid='mark-failed-transfer'
          variant='negative'
          size='small'
        >
          {translate('actions.markFailed')}
        </Button>
      </OperationWrapper>
      <OperationWrapper operation={claimTransferRefund}>
        <Button
          data-testid='claim-transfer-refund'
          data-value={ModalKey.transferClaimRefund}
          data-node-id={id}
          onClick={onTransferActionClick}
          variant='secondary'
          size='small'
        >
          {translate('actions.claimRefund')}
        </Button>
      </OperationWrapper>
      <OperationWrapper operation={cancelTransfer}>
        <Button
          data-testid='transfer-cancel'
          data-value={ModalKey.transferCancel}
          data-node-id={id}
          onClick={onTransferActionClick}
          variant='secondary'
          size='small'
        >
          {translate('actions.cancel')}
        </Button>
      </OperationWrapper>
      <OperationWrapper operation={postponeTransfer}>
        <Button
          data-testid='transfer-postpone'
          data-value={ModalKey.transferPostpone}
          data-node-id={id}
          onClick={onTransferActionClick}
          variant='secondary'
          size='small'
        >
          {translate('actions.postpone')}
        </Button>
      </OperationWrapper>
    </InlineActionsWrapper>
  )
}

TableRowActions.displayName = displayName

export default memo(TableRowActions)
