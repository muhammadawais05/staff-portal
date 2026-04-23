import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { JobListItemFragment } from '../JobListItem/data/job-list-item-fragment'
import { createJobListItemFragment } from '../JobListItem/data/job-list-item-fragment/mocks'
import TalentField from './TalentField'

const arrangeTest = (job: Partial<JobListItemFragment> = {}) => {
  const jobMock = createJobListItemFragment(job)

  render(
    <TestWrapper>
      <TalentField
        talentCount={jobMock.talentCount}
        jobEngagements={jobMock.engagements?.nodes}
        data-testid='talent_field'
      />
    </TestWrapper>
  )
}

describe('TalentField', () => {
  it('renders link to first talent', () => {
    arrangeTest()

    expect(screen.getByTestId('talent_link')).toBeInTheDocument()
    expect(screen.getByTestId('talent_link')).toHaveTextContent('John Doe')
  })

  it('renders Pending when job has no talent', () => {
    arrangeTest({ engagements: { nodes: [] } })

    expect(screen.queryByTestId('talent_link')).not.toBeInTheDocument()
    expect(screen.queryByTestId('talent_text')).toHaveTextContent('Pending')
  })

  it('renders Multiple for multi-talent job', () => {
    arrangeTest({ talentCount: 2 })

    expect(screen.queryByTestId('talent_text')).toHaveTextContent('Multiple')
  })
})
