import React, { memo } from 'react'

import { useGetBillingStatsWidgetQuery } from '../../data/getBillingStatsWidget.graphql.types'
import BillingStatsWidgetContent from '../BillingStatsWidgetContent'
import Skeleton from '../../../../../commercialDocument/components/Skeleton'

const displayName = 'BillingStatsWidgetWrapper'

export const BillingStatsWidgetWrapper = () => {
  const { data, loading, initialLoading } = useGetBillingStatsWidgetQuery()

  if (loading || initialLoading) {
    return <Skeleton.BillingStatsWidgetDashboard />
  }

  return <BillingStatsWidgetContent data={data} />
}

BillingStatsWidgetWrapper.displayName = displayName

export default memo(BillingStatsWidgetWrapper)
