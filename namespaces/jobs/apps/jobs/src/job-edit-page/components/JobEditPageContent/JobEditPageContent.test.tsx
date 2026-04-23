import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import JobEditPageContent from './JobEditPageContent'

const arrangeTest = () =>
  render(
    <TestWrapperWithMocks>
      <JobEditPageContent jobId='123' />
    </TestWrapperWithMocks>
  )

describe('#JobEditPageContent', () => {
  it('shows the skeleton loader when is loading', () => {
    arrangeTest()

    expect(
      screen.getByTestId('job-edit-form-skeleton-loader')
    ).toBeInTheDocument()
  })
})
