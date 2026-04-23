import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import EngagementsRatesField from './EngagementsRatesField'
import { TalentEngagementRatesFragment } from '../../data/talent-engament-rates-fragment'

const defaultEngagementRates: TalentEngagementRatesFragment = {
  engagements: {
    counters: {
      acceptedInterviewsNumber: 10,
      approvedTrialsNumber: 5,
      interviewsNumber: 10,
      successRate: 6,
      trialsNumber: 4,
      workingNumber: 0,
      clientsNumber: 0,
      repeatedClientsNumber: 0
    }
  }
}

const arrangeTest = (engagementRates: TalentEngagementRatesFragment) =>
  render(
    <TestWrapper>
      <EngagementsRatesField engagementRates={engagementRates} />
    </TestWrapper>
  )

describe('EngagementsRatesField', () => {
  it('shows engagement rate', async () => {
    const engagementRates = {
      ...defaultEngagementRates
    }

    arrangeTest(engagementRates)

    expect(
      await screen.findByTestId('talent-engagement-rates')
    ).toBeInTheDocument()
  })
})
