import React, { memo } from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'

import HealthStatus from '../HealthStatus'
import Infractions from '../Infractions'
import Coaching from '../Coaching'

export interface Props {
  talentId: string
}

const PerformanceTab = ({ talentId }: Props) => {
  return <>
    <WidgetErrorBoundary emptyOnError>
      <HealthStatus talentId={talentId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <Infractions talentId={talentId} />
    </WidgetErrorBoundary>
    <WidgetErrorBoundary emptyOnError>
      <Coaching talentId={talentId} />
    </WidgetErrorBoundary>
  </>
}

export default memo(PerformanceTab)
