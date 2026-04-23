import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import JobOpportunityStagesNames from './JobOpportunityStagesNames'

const arrangeTest = (opportunityStagesNames: string | undefined) => {
  const {
    container: { innerHTML }
  } = render(
    <TestWrapper>
      <JobOpportunityStagesNames
        opportunityStagesNames={opportunityStagesNames}
      />
    </TestWrapper>
  )

  return innerHTML
}

const OPPORTUNITY_STAGE_NAMES = 'Identified, Closed won'

describe('JobOpportunityStagesNamesType', () => {
  it('shows NO_VALUE when opportunityStagesNames is undefined', () => {
    const content = arrangeTest(undefined)

    expect(content).toContain(NO_VALUE)
  })

  it('does not show NO_VALUE when opportunityStagesNames is presented', () => {
    const content = arrangeTest(OPPORTUNITY_STAGE_NAMES)

    expect(content).not.toContain(NO_VALUE)
  })

  it('has correct text and color', () => {
    const JOB_STAGES_NAMES_COLOR = 'dark-grey'
    const content = arrangeTest(OPPORTUNITY_STAGE_NAMES)

    expect(content).toContain(OPPORTUNITY_STAGE_NAMES)
    expect(content).toContain(JOB_STAGES_NAMES_COLOR)
  })
})
