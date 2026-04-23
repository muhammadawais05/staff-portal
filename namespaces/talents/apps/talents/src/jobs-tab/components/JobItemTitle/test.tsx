import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  EngagementCommitmentEnum,
  EngagementStatus
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { TalentProfileJobsEngagementFragment } from '@staff-portal/engagements'

import JobItemTitle from '../JobItemTitle'

const mockEngagement = (
  clientData: Partial<TalentProfileJobsEngagementFragment['client']> = {}
): TalentProfileJobsEngagementFragment =>
  ({
    id: 'test',
    commitment: EngagementCommitmentEnum.FULL_TIME,
    status: EngagementStatus.ACTIVE,
    cumulativeStatus: 'pending',
    client: {
      id: 'test-client',
      fullName: 'test client',
      enterprise: false,
      webResource: {
        text: 'client name'
      },
      ...clientData
    }
  } as TalentProfileJobsEngagementFragment)

const arrangeTest = (engagement: TalentProfileJobsEngagementFragment) =>
  render(
    <TestWrapper>
      <JobItemTitle engagement={engagement} />
    </TestWrapper>
  )

describe('Jobs tab - Job item title', () => {
  it('renders just client name if NO client url provided', () => {
    arrangeTest(mockEngagement())

    const clientName = screen.getByText('test client')

    expect(clientName).toBeInTheDocument()
    expect(clientName.closest('a')).not.toBeInTheDocument()
  })

  it('renders client link if client url IS provided', () => {
    arrangeTest(
      mockEngagement({ webResource: { text: 'client name', url: '/test' } })
    )

    const clientName = screen.getByText('test client')

    expect(clientName).toBeInTheDocument()
    expect(clientName.closest('a')).toHaveAttribute('href', '/test')
  })

  it('does NOT render enterprise badge if NOT enterprise client', () => {
    arrangeTest(mockEngagement())

    expect(screen.queryByText('Enterprise')).not.toBeInTheDocument()
  })

  it('renders enterprise badge if enterprise client', () => {
    arrangeTest(mockEngagement({ enterprise: true }))

    expect(screen.getByText('Enterprise')).toBeInTheDocument()
  })
})
