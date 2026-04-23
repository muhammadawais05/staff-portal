import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import TrialRateField from './TrialRateField'
import { TalentTrialRateFragment } from '../../data/talent-trial-rate-fragment'

const arrangeTest = (
  props: TalentTrialRateFragment['engagements']['counters']
) =>
  render(
    <TestWrapper>
      <TrialRateField counters={props} />
    </TestWrapper>
  )

describe('TrialRateField', () => {
  it("shows the trial's counters when the sucessful trials value is greater than 0", async () => {
    const counters = {
      successfulTrialsNumber: 5,
      trialSuccessRate: 100,
      rejectedTrialsNumber: 0
    }

    const FIELD_VALUE = `${counters.trialSuccessRate}% (${counters.successfulTrialsNumber} / ${counters.rejectedTrialsNumber})`

    arrangeTest(counters)

    expect(screen.getByText(FIELD_VALUE)).toBeInTheDocument()

    const tooltipIcon = screen.getByTestId('trial-rate-tooltip-icon')

    assertOnTooltipText(
      tooltipIcon,
      new RegExp(`Success rate: ${counters.trialSuccessRate}%`)
    )

    assertOnTooltipText(
      tooltipIcon,
      new RegExp(`Approved trial periods: ${counters.successfulTrialsNumber}`)
    )

    assertOnTooltipText(
      tooltipIcon,
      new RegExp(`Rejected trial periods: ${counters.rejectedTrialsNumber}`)
    )
  })

  it('shows N/A when sucessful trials value is 0', async () => {
    const counters = {
      successfulTrialsNumber: 0,
      trialSuccessRate: 100,
      rejectedTrialsNumber: 0
    }

    const FIELD_VALUE = 'N/A'

    arrangeTest(counters)

    expect(screen.getByText(FIELD_VALUE)).toBeInTheDocument()
  })
})
