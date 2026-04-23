import { Button } from '@toptal/picasso'
import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { ModalKey } from '@staff-portal/billing/src/@types/types'
import { OperationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql.types'
import { useModals } from '@staff-portal/billing/src/_lib/customHooks/useModals'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'

import { usePaymentListContext } from '../../../../context/PaymentListContext'

const displayName = 'PayMultipleButton'

interface Props {
  operation?: OperationItemFragment
}

const PayMultipleButton: FC<Props> = memo<Props>(({ operation }) => {
  const { t: translate } = useTranslation('paymentList')
  const { handleOnOpenModal } = useModals()

  const { filter } = usePaymentListContext()

  const handleOnPayMultipleClick = () =>
    handleOnOpenModal(ModalKey.paymentPayMultiple, {
      data: filter
    })

  return (
    <OperationWrapper operation={operation}>
      <Button
        data-testid={displayName}
        onClick={handleOnPayMultipleClick}
        size='small'
      >
        {translate('header.actions.payMultiple')}
      </Button>
    </OperationWrapper>
  )
})

PayMultipleButton.displayName = displayName

export default PayMultipleButton
