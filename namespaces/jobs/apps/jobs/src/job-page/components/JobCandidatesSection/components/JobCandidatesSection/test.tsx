import React from 'react'
import { screen, render } from '@testing-library/react'
import {
  EngagementStatus,
  InterviewCumulativeStatus,
  TalentJobIssue,
  TalentJobIssueMetricStatus
} from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { useMessageListener } from '@toptal/staff-portal-message-bus'

import { useGetJobCandidates } from './data/get-job-candidates.staff.gql'
import JobCandidatesSection from './JobCandidatesSection'
import CandidatesTableItem from '../CandidatesTableItem'

jest.mock('@toptal/staff-portal-message-bus', () => ({
  ...jest.requireActual('@toptal/staff-portal-message-bus'),
  __esModule: true,
  useMessageListener: jest.fn()
}))
jest.mock('@staff-portal/engagements-interviews')
jest.mock('../CandidatesTableItem', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('./data/get-job-candidates.staff.gql', () => ({
  useGetJobCandidates: jest.fn()
}))
jest.mock('@staff-portal/talents', () => ({
  TalentApplicantSkillsSelector: () => (
    <div data-testid='TalentApplicantSkillsSelector' />
  )
}))

const MockCandidatesTableItem = CandidatesTableItem as jest.Mock

const TEST_JOB_ID = 'jobid-test'

const TEST_ENGAGEMENT = {
  jobIssues: {
    failedMetrics: [
      {
        message: '',
        name: '',
        status: TalentJobIssueMetricStatus.OK
      }
    ],
    status: TalentJobIssue.OK
  },
  node: {
    id: '123',
    cumulativeStatus: '',
    status: EngagementStatus.ACTIVE,
    interview: {
      id: '123',
      cumulativeStatus: InterviewCumulativeStatus.ACCEPTED
    },
    job: {
      id: '123'
    },
    webResource: {
      url: 'http://test.org'
    },
    talent: {
      id: '1231',
      type: '12312',
      fullName: '1231',
      resumeUrl: '',
      webResource: {
        url: 'http://test-talent.org'
      }
    }
  }
}

const useGetJobPageCandidatesMock = useGetJobCandidates as jest.Mock

const arrangeTest = ({
  loading = false,
  candidateEngagements,
  canViewEngagements = true,
  refetch
}: {
  loading: boolean
  candidateEngagements?: unknown
  canViewEngagements?: boolean
  refetch?: () => void
}) => {
  const getCandidatesMock = jest.fn()

  useGetJobPageCandidatesMock.mockImplementation(() => {
    return {
      candidateEngagements,
      loading,
      canViewEngagements,
      refetch
    }
  })

  render(
    <TestWrapperWithMocks>
      <JobCandidatesSection jobId={TEST_JOB_ID} />
    </TestWrapperWithMocks>
  )

  return {
    getCandidatesMock
  }
}

describe('JobCandidatesSection', () => {
  beforeEach(() => {
    MockCandidatesTableItem.mockImplementation(() => (
      <tr data-testid='TalentApplicantSkillsSelector' />
    ))
  })

  it('renders candidates', () => {
    arrangeTest({ loading: false, candidateEngagements: [TEST_ENGAGEMENT] })

    expect(screen.getByTestId('engagements-table')).toBeInTheDocument()
  })

  it('renders candidates skeleton', () => {
    arrangeTest({ loading: true })

    expect(
      screen.getByTestId('JobCandidatesSection-table-skeleton')
    ).toBeInTheDocument()
  })

  it('calls CandidatesTableItem with correct props', () => {
    arrangeTest({
      loading: false,
      candidateEngagements: [TEST_ENGAGEMENT],
      canViewEngagements: false
    })

    expect(MockCandidatesTableItem).toHaveBeenCalledWith(
      expect.objectContaining({
        canViewEngagements: false,
        candidateEngagement: TEST_ENGAGEMENT.node,
        engagementId: TEST_ENGAGEMENT.node.id,
        expanded: false,
        jobIssues: TEST_ENGAGEMENT.jobIssues,
        stripEvent: false
      }),
      {}
    )
  })

  describe('when engagement updated event is triggered', () => {
    describe('when containing the engagement ID', () => {
      it('calls the refetch function', () => {
        const refetch = jest.fn()
        const mockUseMessageListener = useMessageListener as jest.Mock

        mockUseMessageListener.mockImplementation(
          (_, callback: (props: { engagementId: string }) => void) => {
            callback({ engagementId: '123' })
          }
        )

        arrangeTest({
          loading: false,
          candidateEngagements: [TEST_ENGAGEMENT],
          refetch
        })

        expect(refetch).toHaveBeenCalled()
      })
    })

    describe('when does not containing the engagement ID', () => {
      it("doesn't calls the refetch function", () => {
        const refetch = jest.fn()
        const mockUseMessageListener = useMessageListener as jest.Mock

        mockUseMessageListener.mockImplementation(
          (_, callback: (props: { engagementId: string }) => void) => {
            callback({ engagementId: '1' })
          }
        )

        arrangeTest({
          loading: false,
          candidateEngagements: [TEST_ENGAGEMENT],
          refetch
        })

        expect(refetch).not.toHaveBeenCalled()
      })
    })
  })

  describe('when interview updated event is triggered', () => {
    describe('when containing the interview ID', () => {
      it('calls the refetch function', () => {
        const refetch = jest.fn()
        const mockUseMessageListener = useMessageListener as jest.Mock

        mockUseMessageListener.mockImplementation(
          (_, callback: (props: { interviewId: string }) => void) => {
            callback({ interviewId: '123' })
          }
        )

        arrangeTest({
          loading: false,
          candidateEngagements: [TEST_ENGAGEMENT],
          refetch
        })

        expect(refetch).toHaveBeenCalled()
      })
    })

    describe('when does not containing the interview ID', () => {
      it("doesn't calls the refetch function", () => {
        const refetch = jest.fn()
        const mockUseMessageListener = useMessageListener as jest.Mock

        mockUseMessageListener.mockImplementation(
          (_, callback: (props: { interviewId: string }) => void) => {
            callback({ interviewId: '1' })
          }
        )

        arrangeTest({
          loading: false,
          candidateEngagements: [TEST_ENGAGEMENT],
          refetch
        })

        expect(refetch).not.toHaveBeenCalled()
      })
    })
  })
})
