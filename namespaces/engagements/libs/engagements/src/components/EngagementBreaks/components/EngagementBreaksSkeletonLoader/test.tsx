import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import EngagementBreaksSkeletonLoader from './EngagementBreaksSkeletonLoader'

const arrangeTest = () =>
  render(
    <TestWrapper>
      <EngagementBreaksSkeletonLoader />
    </TestWrapper>
  )

describe('EngagementBreaksSkeletonLoader', () => {
  it('renders component', () => {
    arrangeTest()

    expect(
      screen.getByTestId('engagement-breaks-skeleton-loader')
    ).toBeInTheDocument()
  })
})
