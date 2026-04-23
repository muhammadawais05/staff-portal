import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import HiredTalentSectionSkeletonLoader from './HiredTalentSectionSkeletonLoader'

const arrangeTest = () =>
  render(
    <TestWrapper>
      <HiredTalentSectionSkeletonLoader />
    </TestWrapper>
  )

describe('HiredTalentSectionSkeletonLoader', () => {
  it('renders default', () => {
    arrangeTest()

    expect(screen.getByTestId('hired-talent-section')).toBeInTheDocument()
  })
})
