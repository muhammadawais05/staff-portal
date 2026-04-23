import React from 'react'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import InlineActionsWrapper from '@staff-portal/billing/src/components/InlineActionsWrapper'
import InlineActionsSkeleton from '@staff-portal/billing/src/components/InlineActionsSkeleton'

import { usePaymentListContext } from '../../../../context/PaymentListContext'
import { useGetPaymentsListHeaderQuery } from '../../data/getPaymentListHeader.graphql.types'
import { paymentListUpdateEvents } from '../../utils'
import CreatePaymentGroupButton from '../CreatePaymentGroupButton'
import PayMultipleButton from '../PayMultipleButton'
import DownloadPayments from '../DownloadPayments'

const displayName = 'PaymentListHeader'

const PaymentListHeader = () => {
  const { filter } = usePaymentListContext()
  const dataConfig = {
    filter,
    pagination: {
      limit: 0,
      offset: 0
    }
  }
  const {
    data: { operations, alreadyDownloadedCount, totalCount } = {},
    loading,
    initialLoading,
    refetch
  } = useGetData(useGetPaymentsListHeaderQuery, 'payments')(dataConfig, {
    abortKey: displayName
  })

  useRefetch(paymentListUpdateEvents, refetch)

  return (
    <ContentLoader
      as='span'
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<InlineActionsSkeleton />}
    >
      <InlineActionsWrapper>
        <PayMultipleButton operation={operations?.payMultiplePayments} />
        <DownloadPayments
          operation={operations?.downloadPaymentsFromSearch}
          alreadyDownloadedCount={alreadyDownloadedCount}
          totalCount={totalCount}
        />
        <CreatePaymentGroupButton operation={operations?.createPaymentGroup} />
      </InlineActionsWrapper>
    </ContentLoader>
  )
}

PaymentListHeader.displayName = displayName

export default PaymentListHeader
