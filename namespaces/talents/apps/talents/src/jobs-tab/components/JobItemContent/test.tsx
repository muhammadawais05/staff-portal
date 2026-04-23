import React from 'react'
import { Maybe ,
  CommitmentAvailability,
  EngagementCommitmentEnum,
  EngagementStatus
} from '@staff-portal/graphql/staff'
import {
  getByTestId,
  getByText,
  queryByTestId,
  queryByText,
  render,
  screen
} from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  EngagementCommitment,
  TalentProfileJobsEngagementFragment
} from '@staff-portal/engagements'

import JobItemContent from '../JobItemContent'

jest.mock('../JobLink', () => ({
  __esModule: true,
  default: () => <div data-testid='job-link' />
}))

jest.mock('@staff-portal/jobs/src/components/JobClaimerField', () => ({
  __esModule: true,
  default: () => <div data-testid='job-claimer' />
}))

jest.mock('@staff-portal/engagements', () => ({
  EngagementCommitment: jest.fn()
}))
jest.mock('@staff-portal/engagements-interviews', () => ({
  EngagementStatus: { Detailed: () => <span data-testid='engagement-status' /> }
}))
const EngagementCommitmentMock = EngagementCommitment as jest.Mock

const NO_VALUE = '—'

const mockEngagement = (
  engagementData: {
    extraHoursEnabled?: Maybe<boolean>
  } & Partial<TalentProfileJobsEngagementFragment> = {}
): TalentProfileJobsEngagementFragment =>
  ({
    id: 'test',
    extraHoursEnabled: false,
    commitment: EngagementCommitmentEnum.FULL_TIME,
    currentCommitment: {
      availability: CommitmentAvailability.part_time
    },
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
    currentInterviewLock: null,
    ...engagementData
  } as TalentProfileJobsEngagementFragment)

const arrangeTest = (engagement: TalentProfileJobsEngagementFragment) => {
  EngagementCommitmentMock.mockImplementation(() => <div />)

  render(
    <TestWrapper>
      <JobItemContent engagement={engagement} />
    </TestWrapper>
  )
}

describe('Jobs tab - Job item content', () => {
  it('renders job link if job IS specified', () => {
    arrangeTest(
      mockEngagement({ job: { id: 'test-job', webResource: { text: 'job' } } })
    )
    const jobItem = screen.getByTestId('item-field: Job')

    expect(queryByText(jobItem, NO_VALUE)).not.toBeInTheDocument()
    expect(getByTestId(jobItem, 'job-link')).toBeInTheDocument()
  })

  it('renders empty placeholder link if job IS NOT specified', () => {
    arrangeTest(mockEngagement())
    const jobItem = screen.getByTestId('item-field: Job')

    expect(getByText(jobItem, NO_VALUE)).toBeInTheDocument()
    expect(queryByTestId(jobItem, 'job-link')).not.toBeInTheDocument()
  })

  it('renders job claimer', () => {
    arrangeTest(
      mockEngagement({
        job: {
          id: 'test-job',
          claimer: { id: 'test-claimer', webResource: { text: 'claimer' } },
          webResource: { text: 'job' }
        }
      })
    )
    const claimerItem = screen.getByTestId('item-field: Matcher')

    expect(getByTestId(claimerItem, 'job-claimer')).toBeInTheDocument()
  })

  it('renders engagement commitment', () => {
    const engagement = mockEngagement()

    arrangeTest(engagement)

    expect(EngagementCommitmentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        commitment: engagement.commitment,
        commitmentAvailability: engagement?.currentCommitment?.availability
      }),
      expect.anything()
    )
  })

  it('renders engagement status', () => {
    arrangeTest(mockEngagement())

    const statusItem = screen.getByTestId('item-field: Status')

    expect(getByTestId(statusItem, 'engagement-status')).toBeInTheDocument()
  })

  it('renders job start and end dates if specified', () => {
    arrangeTest(
      mockEngagement({ startDate: '2020-10-10', endDate: '2020-11-11' })
    )
    const startDateItem = screen.getByTestId('item-field: Start Date')
    const endDateItem = screen.getByTestId('item-field: End Date')

    expect(queryByText(startDateItem, NO_VALUE)).not.toBeInTheDocument()
    expect(queryByText(endDateItem, NO_VALUE)).not.toBeInTheDocument()
    expect(getByText(startDateItem, 'Oct 10, 2020')).toBeInTheDocument()
    expect(getByText(endDateItem, 'Nov 11, 2020')).toBeInTheDocument()
  })

  it('renders empty placeholders if job dates are NOT specified', () => {
    arrangeTest(mockEngagement())
    const startDateItem = screen.getByTestId('item-field: Start Date')
    const endDateItem = screen.getByTestId('item-field: End Date')

    expect(getByText(startDateItem, NO_VALUE)).toBeInTheDocument()
    expect(getByText(endDateItem, NO_VALUE)).toBeInTheDocument()
  })

  it('renders high priority job lock type', () => {
    const LOCK_TYPE = 'High Priority Lock (Expires in 6 days and 23 hours)'

    arrangeTest(
      mockEngagement({
        currentInterviewLock: {
          id: 'asdfxzcvdf',
          type: LOCK_TYPE
        }
      })
    )
    const startDateItem = screen.getByTestId('item-field: Lock')

    expect(getByText(startDateItem, LOCK_TYPE)).toBeInTheDocument()
  })

  it('renders empty placeholder for high priority job lock', () => {
    arrangeTest(mockEngagement())
    const startDateItem = screen.getByTestId('item-field: Lock')

    expect(getByText(startDateItem, NO_VALUE)).toBeInTheDocument()
  })

  it('renders extra hours on jobs tab', () => {
    arrangeTest(mockEngagement())

    expect(screen.getByTestId('item-field: Extra Hours')).toBeInTheDocument()
  })

  it('renders extra hours Yes', () => {
    arrangeTest(mockEngagement({ extraHoursEnabled: true }))

    expect(screen.getByText('Yes')).toBeInTheDocument()
  })

  it('renders extra hours on jobs No', () => {
    arrangeTest(mockEngagement())

    expect(screen.getByText('No')).toBeInTheDocument()
  })
})
