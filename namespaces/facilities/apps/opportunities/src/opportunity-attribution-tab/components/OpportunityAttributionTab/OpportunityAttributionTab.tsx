import React from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'

import { OpportunityAttribution } from '../OpportunityAttribution'

type Props = {
  opportunityId: string
}

const OpportunityAttributionTab = ({ opportunityId }: Props) => {
  return (
    <WidgetErrorBoundary emptyOnError>
      <OpportunityAttribution opportunityId={opportunityId} />
    </WidgetErrorBoundary>
  )
}

export default OpportunityAttributionTab
