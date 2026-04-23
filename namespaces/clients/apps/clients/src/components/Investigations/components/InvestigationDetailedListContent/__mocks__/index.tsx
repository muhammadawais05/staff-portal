import React from 'react'

import { Investigation } from '../../../types'

const MockComponent = ({
  investigation,
  isResolutionExpanded
}: {
  investigation: Investigation
  isResolutionExpanded: boolean
}) => (
  <div data-testid='InvestigationDetailedListContent'>
    <div data-testid='InvestigationDetailedListContent-investigation'>
      {JSON.stringify(investigation)}
    </div>
    <div data-testid='InvestigationDetailedListContent-isResolutionExpanded'>
      {isResolutionExpanded.toString()}
    </div>
  </div>
)

export default MockComponent
