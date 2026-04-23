import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import JobTaskCardSummary, { Props } from './JobTaskCardSummary'

jest.mock('../JobTaskCardStatus', () => ({
  __esModule: true,
  default: () => <div data-testid='jobs-task-card-status' />
}))

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <JobTaskCardSummary {...props} />
    </TestWrapper>
  )

describe('JobTaskCardSummary', () => {
  it('renders job summary', () => {
    arrangeTest({
      job: {
        jobType: 'developer',
        totalHours: 20,
        commitment: 'full_time',
        currentEngagement: {
          nodes: [{ accessibleBillingCycles: { totalCount: 3 } }]
        }
      }
    } as unknown as Props)

    expect(screen.getByText('Job type')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
    expect(screen.getByText('Full time')).toBeInTheDocument()
    expect(screen.getByText('Total hours')).toBeInTheDocument()
    expect(screen.getByText('20h')).toBeInTheDocument()
    expect(screen.getByText('Billing cycles')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})
