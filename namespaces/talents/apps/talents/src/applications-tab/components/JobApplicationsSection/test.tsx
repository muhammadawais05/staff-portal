import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import JobApplicationsSection from './JobApplicationsSection'
import { useGetPendingJobApplications } from './data'

jest.mock('../JobApplicationSkeletonLoader', () => ({
  __esModule: true,
  default: () => <div data-testid='loader' />
}))

jest.mock('../JobApplicationsTable', () => ({
  __esModule: true,
  default: () => <div data-testid='table' />
}))

jest.mock('./data')

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobApplicationsSection talentId='1' />
    </TestWrapper>
  )

describe('JobApplicationsSection', () => {
  const mockedUseGetPendingJobApplications =
    useGetPendingJobApplications as jest.Mock

  it('renders a loader', () => {
    mockedUseGetPendingJobApplications.mockReturnValue({
      networkLoading: true,
      data: null
    })

    arrangeTest()

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('renders a table', () => {
    mockedUseGetPendingJobApplications.mockReturnValue({
      loading: false,
      data: { talentType: 'Developer', allJobApplications: { totalCount: 1 } }
    })

    arrangeTest()

    expect(screen.getByTestId('table')).toBeInTheDocument()
  })

  it('renders empty state', () => {
    mockedUseGetPendingJobApplications.mockReturnValue({
      loading: false,
      data: {
        talentType: 'ProductManager',
        allJobApplications: { totalCount: 0 }
      }
    })

    arrangeTest()

    expect(
      screen.getByText('This product manager has never applied to jobs.')
    ).toBeInTheDocument()
  })
})
