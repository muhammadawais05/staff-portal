import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { JobListItemFragment } from '../JobListItem/data/job-list-item-fragment'
import { createJobListItemFragment } from '../JobListItem/data/job-list-item-fragment/mocks'
import JobSpecializationField from './JobSpecializationField'

const arrangeTest = (specialization: JobListItemFragment['specialization']) =>
  render(
    <TestWrapper>
      <JobSpecializationField specialization={specialization} />
    </TestWrapper>
  )

describe('JobSpecializationField', () => {
  it('displays JobSpecializationField value as Core', () => {
    arrangeTest(createJobListItemFragment().specialization)

    expect(screen.getByTestId('job-specialization')).toBeInTheDocument()
    expect(screen.getByTestId('job-specialization')).toHaveTextContent('Core')
  })

  it('displays JobSpecializationField without value', () => {
    arrangeTest({ id: '242423432', title: '' })

    expect(screen.getByTestId('job-specialization')).toBeInTheDocument()
    expect(screen.getByTestId('job-specialization')).toHaveTextContent('—')
  })
})
