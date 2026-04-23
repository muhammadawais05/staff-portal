import React from 'react'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { useGetData } from '@staff-portal/billing/src/utils/graphql'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'
import InlineActionsSkeleton from '@staff-portal/billing/src/components/InlineActionsSkeleton'

import { usePaymentGroupListContext } from '../../../../context/PaymentGroupListContext'
import { useGetPaymentGroupsListHeaderQuery } from '../../data/getPaymentGroupListHeader.graphql.types'
import { paymentGroupListUpdateEvents } from '../../utils'
import PayMultipleButton from '../PayMultipleButton'

const displayName = 'PaymentGroupListHeader'

const PaymentGroupListHeader = () => {
  const { filter } = usePaymentGroupListContext()
  const dataConfig = {
    filter,
    pagination: {
      limit: 0,
      offset: 0
    }
  }
  const {
    data: { operations } = {},
    loading,
    initialLoading,
    refetch
  } = useGetData(useGetPaymentGroupsListHeaderQuery, 'paymentGroups')(
    dataConfig,
    {
      abortKey: displayName
    }
  )

  useRefetch(paymentGroupListUpdateEvents, refetch)

  return (
    <ContentLoader
      as='span'
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<InlineActionsSkeleton />}
    >
      <PayMultipleButton operation={operations?.payPaymentGroups} />
    </ContentLoader>
  )
}

PaymentGroupListHeader.displayName = displayName

export default PaymentGroupListHeader
