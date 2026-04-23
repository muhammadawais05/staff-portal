import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { JobListItemFragment } from '../JobListItem/data/job-list-item-fragment'
import { createJobListItemFragment } from '../JobListItem/data/job-list-item-fragment/mocks'
import JobTypeField from './JobTypeField'

const arrangeTest = (jobType: JobListItemFragment['jobType']) =>
  render(
    <TestWrapper>
      <JobTypeField jobType={jobType} />
    </TestWrapper>
  )

describe('JobTypeField', () => {
  it('displays JobTypeField value', () => {
    arrangeTest(createJobListItemFragment().jobType)

    expect(screen.getByTestId('job-type')).toHaveTextContent('Developer job')
  })
})
