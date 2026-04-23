import React from 'react'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import Skeleton from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/Skeleton/Skeleton'
import ListTotals from '@staff-portal/billing-widgets/src/modules/commercialDocument/components/ListTotals/ListTotals'

import { useMyExpectedCommissionsListContext } from '../../context/MyExpectedCommissionsListContext'
import { useGetMyExpectedCommissionsTotalsQuery } from '../../data'

const ExpectedComissionsTotals = () => {
  const { pagination } = useMyExpectedCommissionsListContext()

  const { data, loading } = useGetMyExpectedCommissionsTotalsQuery({
    variables: { pagination }
  })

  const totals = {
    outstanding: data?.viewer?.expectedCommissions?.totals.amount
  }

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={loading}
      skeletonComponent={<Skeleton.ListTotals />}
    >
      <ListTotals totals={totals} sortOrder={['outstanding']} />
    </ContentLoader>
  )
}

export default ExpectedComissionsTotals
