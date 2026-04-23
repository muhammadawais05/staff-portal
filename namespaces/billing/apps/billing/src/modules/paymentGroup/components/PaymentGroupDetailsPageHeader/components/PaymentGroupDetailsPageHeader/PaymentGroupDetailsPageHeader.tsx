import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@toptal/picasso'
import InlineActionsSkeleton from '@staff-portal/billing/src/components/InlineActionsSkeleton'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import { useGetNode } from '@staff-portal/billing/src/utils/graphql'
import OperationWrapper from '@staff-portal/billing/src/components/OperationWrapper'
import InlineActionsWrapper from '@staff-portal/billing/src/components/InlineActionsWrapper'
import {
  PaymentGroupAction,
  usePaymentGroupActionHandler
} from '@staff-portal/billing-widgets/src/modules/paymentGroup/utils'

import DetailsHeader from '../../../../../commercialDocument/components/DetailsHeader'
import { useGetPaymentGroupDetailsHeaderQuery } from '../../data'
import { paymentGroupDetailsUpdateDataEvents } from '../../../../utils'

interface Props {
  paymentGroupId: string
}

const PaymentGroupDetailsPageHeader = ({ paymentGroupId }: Props) => {
  const { t: translate } = useTranslation('paymentGroup')
  const {
    data: paymentGroup,
    initialLoading,
    loading,
    refetch
  } = useGetNode(useGetPaymentGroupDetailsHeaderQuery)({ paymentGroupId })
  const { handleOnActionClick: handleOnClick } = usePaymentGroupActionHandler()

  useRefetch(paymentGroupDetailsUpdateDataEvents, () => refetch())

  if (initialLoading || loading) {
    return (
      <InlineActionsWrapper marginSizeBetweenChildren='small'>
        <InlineActionsSkeleton numberOfButtons={2} size='small' />
      </InlineActionsWrapper>
    )
  }

  const { gid, number, operations, historyLink } = paymentGroup

  return (
    <>
      <InlineActionsWrapper marginSizeBetweenChildren='small'>
        <OperationWrapper operation={operations.payPaymentGroup}>
          <Button
            data-node-id={number}
            data-testid='pay-payment-group'
            data-value={PaymentGroupAction.PAY}
            onClick={handleOnClick}
            size='small'
          >
            {translate('page.header.actions.pay')}
          </Button>
        </OperationWrapper>
        <OperationWrapper operation={operations.cancelPaymentGroup}>
          <Button
            variant='negative'
            data-node-id={number}
            data-testid='cancel-payment-group'
            data-value={PaymentGroupAction.CANCEL}
            onClick={handleOnClick}
            size='small'
          >
            {translate('page.header.actions.cancel')}
          </Button>
        </OperationWrapper>
      </InlineActionsWrapper>
      <DetailsHeader
        gid={gid}
        type='payment_groups'
        renderRecentActivityButton={Boolean(historyLink?.url)}
      />
    </>
  )
}

export default PaymentGroupDetailsPageHeader
