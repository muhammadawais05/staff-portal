import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import {
  EngagementCommitmentEnum,
  EngagementStatus
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { useGetCandidateJobs } from '../../data/get-candidate-jobs/get-candidate-jobs.staff.gql'
import JobItems from './JobItems'
import { CandidateJobsEngagementFragment } from '../../data/get-candidate-jobs/get-candidate-jobs.staff.gql.types'

jest.mock('../../data/get-candidate-jobs/get-candidate-jobs.staff.gql')
const mockUseGetCandidateJobs = useGetCandidateJobs as jest.Mock

jest.mock('../JobItem/JobItem', () => ({
  __esModule: true,
  default: ({
    engagement
  }: {
    engagement: CandidateJobsEngagementFragment
  }) => <div data-testid={`job-item:${engagement.id}`} />
}))

jest.mock(
  '../../../../components/ItemSkeletonLoader/ItemSkeletonLoader',
  () => ({
    __esModule: true,
    default: () => <div data-testid='skeleton-loader' />
  })
)

const TALENT_ID = 'VjEtVGFsZW50LTE5OTI3MTQ'

const mockEngagement = (
  engagementData: Partial<CandidateJobsEngagementFragment> = {}
): CandidateJobsEngagementFragment =>
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
  } as CandidateJobsEngagementFragment)

const arrangeTest = ({
  includeRejected = false
}: { includeRejected?: boolean } = {}) =>
  render(
    <TestWrapper>
      <JobItems talentId={TALENT_ID} includeRejected={includeRejected} />
    </TestWrapper>
  )

describe('Jobs section', () => {
  it('returns null if no data was loaded', () => {
    mockUseGetCandidateJobs.mockReturnValue({ loading: false })

    expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
    expect(
      screen.queryByText('There are no jobs to display.')
    ).not.toBeInTheDocument()
  })

  it('renders loader if data is loading', async () => {
    mockUseGetCandidateJobs.mockReturnValue({ loading: true })

    arrangeTest()

    expect(await screen.findAllByTestId('skeleton-loader')).toHaveLength(2)
  })

  describe('renders relevant job items', () => {
    const response = {
      loading: false,
      data: {
        id: 'talent-id',
        type: 'developer',
        engagements: {
          nodes: [
            mockEngagement({
              id: 'engagement-1',
              status: EngagementStatus.ACTIVE
            }),
            mockEngagement({
              id: 'engagement-2',
              status: EngagementStatus.CLOSED
            }),
            mockEngagement({
              id: 'engagement-3',
              status: EngagementStatus.REJECTED_INTERVIEW
            })
          ]
        }
      }
    }

    it('renders active, closed, rejected during interview job items', async () => {
      mockUseGetCandidateJobs.mockReturnValue(response)
      arrangeTest({ includeRejected: true })

      expect(screen.getByTestId('job-item:engagement-1')).toBeInTheDocument()
      expect(screen.getByTestId('job-item:engagement-2')).toBeInTheDocument()
      expect(screen.getByTestId('job-item:engagement-3')).toBeInTheDocument()
    })

    it('applies filtering', async () => {
      mockUseGetCandidateJobs.mockReturnValue(response)
      arrangeTest()

      expect(screen.getByTestId('job-item:engagement-1')).toBeInTheDocument()
      expect(screen.getByTestId('job-item:engagement-2')).toBeInTheDocument()
      expect(
        screen.queryByTestId('job-item:engagement-3')
      ).not.toBeInTheDocument()
    })

    it('renders at maximum 3 job items', async () => {
      const responseWithManyJobs = {
        ...response,
        data: {
          ...response.data,
          engagements: {
            nodes: [
              ...response.data.engagements.nodes,
              mockEngagement({
                id: 'engagement-4',
                status: EngagementStatus.ON_TRIAL
              }),
              mockEngagement({
                id: 'engagement-5',
                status: EngagementStatus.SCHEDULED
              })
            ]
          }
        }
      }

      mockUseGetCandidateJobs.mockReturnValue(responseWithManyJobs)
      arrangeTest({ includeRejected: true })

      expect(screen.getByTestId('job-item:engagement-1')).toBeInTheDocument()
      expect(screen.getByTestId('job-item:engagement-2')).toBeInTheDocument()
      expect(screen.getByTestId('job-item:engagement-3')).toBeInTheDocument()
      expect(
        screen.queryByTestId('job-item:engagement-4')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('job-item:engagement-5')
      ).not.toBeInTheDocument()
      expect(screen.getByText('View 2 More Jobs')).toBeInTheDocument()

      fireEvent.click(screen.getByText('View 2 More Jobs'))

      expect(screen.getByTestId('job-item:engagement-1')).toBeInTheDocument()
      expect(screen.getByTestId('job-item:engagement-2')).toBeInTheDocument()
      expect(screen.getByTestId('job-item:engagement-3')).toBeInTheDocument()
      expect(screen.getByTestId('job-item:engagement-4')).toBeInTheDocument()
      expect(screen.getByTestId('job-item:engagement-5')).toBeInTheDocument()
      expect(screen.getByText('View Less')).toBeInTheDocument()
    })

    it('renders "View More" button in singular if it has 1 more job', async () => {
      const responseWithOneMoreJob = {
        ...response,
        data: {
          ...response.data,
          engagements: {
            nodes: [
              ...response.data.engagements.nodes,
              mockEngagement({
                id: 'engagement-4',
                status: EngagementStatus.ON_TRIAL
              })
            ]
          }
        }
      }

      mockUseGetCandidateJobs.mockReturnValue(responseWithOneMoreJob)
      arrangeTest({ includeRejected: true })

      expect(screen.getByTestId('job-item:engagement-1')).toBeInTheDocument()
      expect(screen.getByTestId('job-item:engagement-2')).toBeInTheDocument()
      expect(screen.getByTestId('job-item:engagement-3')).toBeInTheDocument()
      expect(
        screen.queryByTestId('job-item:engagement-4')
      ).not.toBeInTheDocument()
      expect(screen.getByText(/^View 1 More Job$/)).toBeInTheDocument()
    })
  })
})
