import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import HiredTalentRowContentSkeletonLoader from './HiredTalentRowContentSkeletonLoader'

const arrangeTest = () =>
  render(
    <TestWrapper>
      <HiredTalentRowContentSkeletonLoader />
    </TestWrapper>
  )

describe('HiredTalentRowContentSkeletonLoader', () => {
  it('renders default', () => {
    arrangeTest()

    expect(
      screen.queryByTestId('TalentDetailsSkeletonLoader')
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('TalentDetailsSkeletonLoader-DetailedList')
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('JobContractsSkeletonLoader')
    ).toBeInTheDocument()
    expect(
      screen.queryByTestId('JobCommissionsSkeletonLoader')
    ).toBeInTheDocument()
  })
})
