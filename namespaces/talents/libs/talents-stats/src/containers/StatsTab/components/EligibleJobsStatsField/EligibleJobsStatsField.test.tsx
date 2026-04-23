import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import EligibleJobsStatsField from './EligibleJobsStatsField'

describe('EligibleJobsStatsField', () => {
  it('renders value when provided', () => {
    render(
      <TestWrapper>
        <EligibleJobsStatsField value='Some value' />
      </TestWrapper>
    )

    expect(screen.queryByText('Some value')).toBeInTheDocument()
  })

  it('renders fallback text when no value', () => {
    render(
      <TestWrapper>
        <EligibleJobsStatsField value={null} />
      </TestWrapper>
    )

    expect(screen.queryByText('N/A')).toBeInTheDocument()
  })
})
