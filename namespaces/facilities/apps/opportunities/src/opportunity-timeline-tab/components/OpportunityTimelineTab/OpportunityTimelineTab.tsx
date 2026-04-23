import React from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'

import { OpportunityTimelineSection } from '../OpportunityTimelineSection'

type Props = {
  opportunityId: string
}

const OpportunityTimelineTab = ({ opportunityId }: Props) => {
  return (
    <WidgetErrorBoundary emptyOnError>
      <OpportunityTimelineSection opportunityId={opportunityId} />
    </WidgetErrorBoundary>
  )
}

export default OpportunityTimelineTab
