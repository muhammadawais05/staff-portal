import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { useLocation } from '@staff-portal/navigation'
import {
  EngagementCommitmentEnum,
  EngagementStatus
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { TalentProfileJobsEngagementFragment } from '@staff-portal/engagements'

import { JobsFilterType } from '../../enums'
import JobsTab from '../JobsTab'
import { useGetTalentProfileJobs } from '../JobsTab/data'

jest.mock('../JobsTab/data')
jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  __esModule: true,
  useLocation: jest.fn()
}))

const mockUseLocation = useLocation as jest.Mock
const mockUseGetTalentProfileJobs = useGetTalentProfileJobs as jest.Mock

jest.mock('../JobItem', () => ({
  __esModule: true,
  default: ({
    engagement
  }: {
    engagement: TalentProfileJobsEngagementFragment
  }) => <div data-testid={`job-item:${engagement.id}`} />
}))

jest.mock('../JobItemSkeletonLoader', () => ({
  __esModule: true,
  default: () => <div data-testid='skeleton-loader' />
}))

const TALENT_ID = 'VjEtVGFsZW50LTE5OTI3MTQ'

const mockEngagement = (
  engagementData: Partial<TalentProfileJobsEngagementFragment> = {}
): TalentProfileJobsEngagementFragment =>
  ({
    id: 'test',
    commitment: EngagementCommitmentEnum.FULL_TIME,
    status: EngagementStatus.ACTIVE,
    cumulativeStatus: 'pending',
    client: {
      id: 'test-client',
      fullName: 'test client',
      enterprise: false,
      webResource: {
        text: 'client name'
      }
    },
    ...engagementData
  } as TalentProfileJobsEngagementFragment)

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobsTab talentId={TALENT_ID} />
    </TestWrapper>
  )

describe('Jobs tab', () => {
  it('returns null if not data', () => {
    mockUseLocation.mockReturnValue({})
    mockUseGetTalentProfileJobs.mockReturnValue({ loading: false })

    expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
    expect(
      screen.queryByText('There are no jobs to display.')
    ).not.toBeInTheDocument()
  })

  it('renders loader if is loading', async () => {
    mockUseLocation.mockReturnValue({})
    mockUseGetTalentProfileJobs.mockReturnValue({ loading: true })

    arrangeTest()

    expect(await screen.findByTestId('skeleton-loader')).toBeInTheDocument()
  })

  it('renders job items if there are engagements specified', async () => {
    mockUseLocation.mockReturnValue({})
    mockUseGetTalentProfileJobs.mockReturnValue({
      loading: false,
      data: {
        id: 'talent-id',
        type: 'developer',
        engagements: {
          nodes: [
            mockEngagement({ id: 'engagement-1' }),
            mockEngagement({ id: 'engagement-2' }),
            mockEngagement({ id: 'engagement-3' })
          ]
        }
      }
    })

    arrangeTest()

    expect(
      await screen.findByTestId('job-item:engagement-1')
    ).toBeInTheDocument()
    expect(screen.getByTestId('job-item:engagement-2')).toBeInTheDocument()
    expect(screen.getByTestId('job-item:engagement-3')).toBeInTheDocument()
  })

  describe('when `Jobs Filter` query parameter is not set', () => {
    it('does NOT filter jobs', async () => {
      mockUseGetTalentProfileJobs.mockReturnValue({ loading: true })
      mockUseLocation.mockReturnValue({
        search: '?abc=asdfasdg'
      })

      arrangeTest()

      await waitFor(() =>
        expect(mockUseGetTalentProfileJobs).toHaveBeenCalledWith({
          talentId: TALENT_ID,
          skip: false
        })
      )
    })
  })

  describe('when `Jobs Filter` query parameter has string value', () => {
    it('does NOT use wrong query string to filter jobs', async () => {
      mockUseGetTalentProfileJobs.mockReturnValue({ loading: true })
      mockUseLocation.mockReturnValue({
        search: '?jobs_filter=asdfasdg'
      })
      arrangeTest()
      await waitFor(() =>
        expect(mockUseGetTalentProfileJobs).toHaveBeenCalledWith({
          talentId: TALENT_ID,
          jobsFilter: [],
          skip: false
        })
      )
    })

    it('does uses correct query string to filter jobs', async () => {
      mockUseGetTalentProfileJobs.mockReturnValue({ loading: true })
      mockUseLocation.mockReturnValue({
        search: `?jobs_filter=in_evaluation`
      })

      arrangeTest()

      await waitFor(() =>
        expect(mockUseGetTalentProfileJobs).toHaveBeenCalledWith({
          talentId: TALENT_ID,
          jobsFilter: [JobsFilterType.IN_EVALUATION],
          skip: false
        })
      )
    })
  })

  describe('when `Jobs Filter` query parameter has array value', () => {
    it('does NOT use wrong query string to filter jobs', async () => {
      mockUseGetTalentProfileJobs.mockReturnValue({ loading: true })
      mockUseLocation.mockReturnValue({
        search: '?jobs_filter%5B%5D=abc&jobs_filter%5B%5D=cde'
      })

      arrangeTest()

      await waitFor(() =>
        expect(mockUseGetTalentProfileJobs).toHaveBeenCalledWith({
          talentId: TALENT_ID,
          jobsFilter: [],
          skip: false
        })
      )
    })

    it('does uses partially correct query string to filter jobs', async () => {
      mockUseGetTalentProfileJobs.mockReturnValue({ loading: true })
      mockUseLocation.mockReturnValue({
        search: `?jobs_filter%5B%5D=abc&jobs_filter%5B%5D=in_evaluation`
      })

      arrangeTest()

      await waitFor(() =>
        expect(mockUseGetTalentProfileJobs).toHaveBeenCalledWith({
          talentId: TALENT_ID,
          jobsFilter: [JobsFilterType.IN_EVALUATION],
          skip: false
        })
      )
    })

    it('does uses correct query string to filter jobs', async () => {
      mockUseGetTalentProfileJobs.mockReturnValue({ loading: true })
      mockUseLocation.mockReturnValue({
        search: `?jobs_filter%5B%5D=in_evaluation&jobs_filter%5B%5D=working`
      })

      arrangeTest()

      await waitFor(() =>
        expect(mockUseGetTalentProfileJobs).toHaveBeenCalledWith({
          talentId: TALENT_ID,
          jobsFilter: [JobsFilterType.IN_EVALUATION, JobsFilterType.WORKING],
          skip: false
        })
      )
    })
  })
})
