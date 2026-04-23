import React from 'react'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'

import SourcingRequestDetails from '../SourcingRequestDetails'
import SourcingRequestAccountInformation from '../SourcingRequestAccountInformation'
import SourcingRequestPositionDetails from '../SourcingRequestPositionDetails'
import SourcingRequestBudgetDetails from '../SourcingRequestBudgetDetails'
import SourcingRequestTimeZoneLocationDetails from '../SourcingRequestTimeZoneLocationDetails'
import SourcingRequestAdditionalNotes from '../SourcingRequestAdditionalNotes'
import SourcingRequestSourcedTalents from '../SourcingRequestSourcedTalents'
interface Props {
  jobId: string
}

export const SourcingRequestTab = ({ jobId }: Props) => {
  return (
    <>
      <WidgetErrorBoundary emptyOnError>
        <SourcingRequestDetails jobId={jobId} />
      </WidgetErrorBoundary>

      <WidgetErrorBoundary emptyOnError>
        <SourcingRequestAccountInformation jobId={jobId} />
      </WidgetErrorBoundary>

      <WidgetErrorBoundary emptyOnError>
        <SourcingRequestPositionDetails jobId={jobId} />
      </WidgetErrorBoundary>

      <WidgetErrorBoundary emptyOnError>
        <SourcingRequestBudgetDetails jobId={jobId} />
      </WidgetErrorBoundary>

      <WidgetErrorBoundary emptyOnError>
        <SourcingRequestTimeZoneLocationDetails jobId={jobId} />
      </WidgetErrorBoundary>

      <WidgetErrorBoundary emptyOnError>
        <SourcingRequestAdditionalNotes jobId={jobId} />
      </WidgetErrorBoundary>

      <WidgetErrorBoundary emptyOnError>
        <SourcingRequestSourcedTalents jobId={jobId} />
      </WidgetErrorBoundary>
    </>
  )
}

export default SourcingRequestTab
