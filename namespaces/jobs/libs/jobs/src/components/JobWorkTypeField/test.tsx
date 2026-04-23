import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { JobWorkType } from '@staff-portal/graphql/staff'

import JobWorkTypeField from './JobWorkTypeField'

const arrangeTest = (workType: JobWorkType) =>
  render(
    <TestWrapper>
      <JobWorkTypeField workType={workType} />
    </TestWrapper>
  )

describe('JobWorkTypeField', () => {
  it('displays JobWorkTypeField value', () => {
    arrangeTest(JobWorkType.REMOTE)

    expect(screen.getByTestId('job-work-type')).toHaveTextContent('Remote')
  })
})
