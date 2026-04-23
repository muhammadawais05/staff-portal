import React from 'react'

import {
  Investigation,
  Operations
} from '../../../types'

const MockComponent = ({
  investigation,
  clientId,
  isResolutionExpanded,
  isJobsExpanded,
  operations
}: {
  investigation: Investigation
  clientId: string
  isResolutionExpanded: boolean
  isJobsExpanded: boolean
  operations?: Operations
}) => (
  <div data-testid='InvestigationsActions'>
    <div data-testid='InvestigationsActions-investigation'>
      {JSON.stringify(investigation)}
    </div>
    <div data-testid='InvestigationsActions-clientId'>{clientId}</div>
    <div data-testid='InvestigationsActions-isResolutionExpanded'>
      {isResolutionExpanded.toString()}
    </div>
    <div data-testid='InvestigationsActions-isJobsExpanded'>
      {isJobsExpanded.toString()}
    </div>
    <div data-testid='InvestigationsActions-operations'>
      {JSON.stringify(operations)}
    </div>
  </div>
)

export default MockComponent
