import React, { memo, ComponentProps } from 'react'
import { DashboardItemWrapper } from '@staff-portal/ui'

import { useGetDashboardCommissionWidgetQuery } from '../../data/getDashboardCommissionWidget.graphql.types'
import CommissionWidgetContent from '../CommissionWidgetContent'
import Skeleton from '../../../../../commercialDocument/components/Skeleton'

const displayName = 'CommissionWidgetWrapper'

interface Props {
  gridSize?: ComponentProps<typeof DashboardItemWrapper>['gridSize']
}

export const CommissionWidgetWrapper = ({ gridSize }: Props) => {
  const { data, loading, initialLoading } =
    useGetDashboardCommissionWidgetQuery()

  if (loading || initialLoading) {
    return <Skeleton.DashboardItem gridSize={gridSize} />
  }

  return <CommissionWidgetContent data={data} gridSize={gridSize} />
}

CommissionWidgetWrapper.displayName = displayName

export default memo(CommissionWidgetWrapper)
