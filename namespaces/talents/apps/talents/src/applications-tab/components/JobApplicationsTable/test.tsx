import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { JobApplicationFragment } from '../../data/job-application-fragment'
import JobApplicationsTable from './JobApplicationsTable'
import { useLazyGetResolvedJobApplications } from './data'

jest.mock('../JobApplicationRow', () => ({
  __esModule: true,
  default: () => <tr data-testid='row' />
}))

jest.mock('./data')

const TALENT_TYPE = 'product manager'

const arrangeTest = ({
  hasMore,
  pendingJobApplications
}: {
  hasMore: boolean
  pendingJobApplications: JobApplicationFragment[] | null
}) =>
  render(
    <TestWrapper>
      <JobApplicationsTable
        pendingJobApplications={pendingJobApplications}
        talentId='1'
        talentType={TALENT_TYPE}
        hasMore={hasMore}
      />
    </TestWrapper>
  )

describe('JobApplicationsTable', () => {
  const mockedUseLazyGetResolvedJobApplications =
    useLazyGetResolvedJobApplications as jest.Mock

  it('renders no pending job applications text', () => {
    mockedUseLazyGetResolvedJobApplications.mockReturnValue({
      data: undefined,
      getResolvedJobApplication: jest.fn()
    })

    arrangeTest({ pendingJobApplications: [], hasMore: false })

    expect(
      screen.getByText(`This ${TALENT_TYPE} has no pending job applications.`)
    ).toBeInTheDocument()
  })

  it('renders pending job applications', () => {
    mockedUseLazyGetResolvedJobApplications.mockReturnValue({
      data: undefined,
      getResolvedJobApplication: jest.fn()
    })

    arrangeTest({
      pendingJobApplications: [{ id: '123' } as JobApplicationFragment],
      hasMore: false
    })

    expect(screen.getByTestId('row')).toBeInTheDocument()
  })

  it('renders View resolved job applications button', () => {
    mockedUseLazyGetResolvedJobApplications.mockReturnValue({
      data: undefined,
      getResolvedJobApplication: jest.fn()
    })

    arrangeTest({ pendingJobApplications: [], hasMore: true })

    expect(
      screen.getByText('Show Resolved Job Applications')
    ).toBeInTheDocument()
  })

  it('renders resolved job applications', () => {
    mockedUseLazyGetResolvedJobApplications.mockReturnValue({
      data: [{ id: '123' } as JobApplicationFragment]
    })

    arrangeTest({ pendingJobApplications: [], hasMore: true })

    expect(screen.getByTestId('row')).toBeInTheDocument()
    expect(
      screen.queryByText('Show Resolved Job Applications')
    ).not.toBeInTheDocument()
  })
})
