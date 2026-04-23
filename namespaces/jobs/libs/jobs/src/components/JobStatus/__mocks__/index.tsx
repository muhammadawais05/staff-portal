import React from 'react'

import { JobStatusInput } from '../../../types'

const MockComponent = ({
  job,
  tooltipContent = 'default tooltip content',
  inheritStyling = false,
  showTooltip = true,
  ignoreInvestigationStatus = false
}: {
  job: JobStatusInput
  tooltipContent?: string
  inheritStyling?: boolean
  showTooltip?: boolean
  ignoreInvestigationStatus?: boolean
}) => (
  <div data-testid='JobStatus'>
    <div data-testid='JobStatus-job'>{JSON.stringify(job)}</div>
    <div data-testid='JobStatus-tooltipContent'>{tooltipContent}</div>
    <div data-testid='JobStatus-inheritStyling'>
      {inheritStyling.toString()}
    </div>
    <div data-testid='JobStatus-showTooltip'>{showTooltip.toString()}</div>
    <div data-testid='JobStatus-ignoreInvestigationStatus'>
      {ignoreInvestigationStatus.toString()}
    </div>
  </div>
)

export default MockComponent
