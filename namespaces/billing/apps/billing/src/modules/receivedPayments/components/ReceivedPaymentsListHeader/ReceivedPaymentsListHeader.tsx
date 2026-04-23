import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@toptal/picasso'
import { InlineActionsWrapper } from '@staff-portal/operations'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'

import { useGetReceivedPaymentsListHeaderQuery } from '../../data'

const displayName = 'ReceivedPaymentsListHeader'

const ReceivedPaymentsListHeader = () => {
  const { t: translate } = useTranslation('receivedPayments')
  const { handleOnOpenModal } = useModals()
  // 'no-cache' is the only policy that does not cause Cypress tests to fail
  const { data } = useGetReceivedPaymentsListHeaderQuery({
    fetchPolicy: 'no-cache'
  })
  const handleOpenHistoryPayments = () =>
    handleOnOpenModal(ModalKey.receivedPaymentsHistory)
  const handleOpenCommissions = () =>
    handleOnOpenModal(ModalKey.receivedPaymentsCommissions)
  const handleOpenShowProjections = () =>
    handleOnOpenModal(ModalKey.receivedPaymentsProjections)

  return (
    <InlineActionsWrapper>
      <OperationWrapper operation={data?.viewer.operations.downloadCommissions}>
        <Button
          onClick={handleOpenCommissions}
          size='small'
          data-testid='download-commissions'
        >
          {translate('header.actions.download')}
        </Button>
      </OperationWrapper>
      <OperationWrapper
        operation={data?.viewer.me.operations.downloadRolePaymentHistory}
      >
        <Button
          onClick={handleOpenHistoryPayments}
          data-testid='payments-history'
          size='small'
        >
          {translate('header.actions.history')}
        </Button>
      </OperationWrapper>
      {data?.viewer.projectedCommissions?.available && (
        <Button onClick={handleOpenShowProjections} size='small'>
          {translate('header.actions.showProjections')}
        </Button>
      )}
    </InlineActionsWrapper>
  )
}

ReceivedPaymentsListHeader.displayName = displayName

export default ReceivedPaymentsListHeader
