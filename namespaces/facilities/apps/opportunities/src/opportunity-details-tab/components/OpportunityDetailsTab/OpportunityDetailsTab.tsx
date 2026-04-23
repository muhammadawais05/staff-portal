import React from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'

import { OpportunityDetails } from '../OpportunityDetails'
import OpportunityTeamContainer from '../OpportunityTeamContainer'

type Props = {
  opportunityId: string
}

const OpportunityDetailsTab = ({ opportunityId }: Props) => {
  return (
    <>
      <WidgetErrorBoundary emptyOnError>
        <OpportunityDetails opportunityId={opportunityId} />
      </WidgetErrorBoundary>
      <WidgetErrorBoundary emptyOnError>
        <OpportunityTeamContainer opportunityId={opportunityId} />
      </WidgetErrorBoundary>
    </>
  )
}

export default OpportunityDetailsTab
