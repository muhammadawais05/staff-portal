import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import {
  CommitmentAvailability,
  EngagementCommitmentEnum,
  JobStatus
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { noop } from '@toptal/picasso/utils'

import CommitmentField from './CommitmentField'
import { JobListItemFragment } from '../JobListItem/data'
import { createJobListItemFragment } from '../JobListItem/data/job-list-item-fragment/mocks'

const arrangeTest = (job: JobListItemFragment) =>
  render(
    <TestWrapper>
      <CommitmentField job={job} />
    </TestWrapper>
  )

describe('CommitmentField', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(noop)
  })

  it('renders desired commitment', () => {
    arrangeTest(
      createJobListItemFragment({
        commitment: 'hourly',
        currentEngagement: null,
        talentCount: 1,
        status: JobStatus.POSTPONED
      })
    )

    const commitment = screen.getByTestId('commitment-text')
    const tooltip = screen.queryByRole('tooltip')

    expect(commitment).toBeInTheDocument()
    expect(commitment).toHaveTextContent('Hourly')
    expect(tooltip).not.toBeInTheDocument()
  })

  it('renders current commitment', () => {
    arrangeTest(
      createJobListItemFragment({
        commitment: 'hourly',
        currentEngagement: {
          id: '123',
          commitment: EngagementCommitmentEnum.FULL_TIME,
          currentCommitment: { availability: CommitmentAvailability.full_time }
        },
        talentCount: 1
      })
    )
    const commitment = screen.getByTestId('commitment-text')

    expect(commitment).toBeInTheDocument()
    expect(commitment).toHaveTextContent('Full-time')
  })

  it('renders a message about commitment change', async () => {
    arrangeTest(
      createJobListItemFragment({
        commitment: 'hourly',
        currentEngagement: {
          id: '123',
          commitment: EngagementCommitmentEnum.PART_TIME,
          currentCommitment: { availability: CommitmentAvailability.full_time }
        },
        talentCount: 1,
        status: JobStatus.ACTIVE
      })
    )
    const commitment = screen.getByTestId('commitment-text')

    expect(commitment).toBeInTheDocument()
    expect(commitment).toHaveTextContent('Part-time')

    const commitmentQuestionMarkIcon = screen.getByTestId(
      'commitment-question-mark-icon'
    )

    fireEvent.mouseOver(commitmentQuestionMarkIcon)

    const tooltip = await screen.findByRole('tooltip')

    expect(tooltip).toHaveTextContent(
      'Commitment scheduled to change to part-timeCommitment: Part-time'
    )
    fireEvent.mouseOut(commitment)
  })

  it('does not render a message about commitment change if it is the same', () => {
    arrangeTest(
      createJobListItemFragment({
        commitment: 'hourly',
        currentEngagement: {
          id: '123',
          commitment: EngagementCommitmentEnum.HOURLY,
          currentCommitment: { availability: CommitmentAvailability.hourly }
        },
        talentCount: 1,
        status: JobStatus.ACTIVE
      })
    )
    const commitment = screen.getByTestId('commitment-text')

    expect(commitment).toBeInTheDocument()
    expect(commitment).toHaveTextContent('Hourly')
  })

  it('renders tooltip with desired commitment', async () => {
    arrangeTest(
      createJobListItemFragment({
        commitment: 'hourly',
        currentEngagement: {
          id: '123',
          commitment: EngagementCommitmentEnum.FULL_TIME,
          currentCommitment: { availability: CommitmentAvailability.full_time }
        },
        talentCount: 1,
        status: JobStatus.ACTIVE
      })
    )
    const commitment = screen.getByTestId('commitment-text')

    expect(commitment).toBeInTheDocument()

    const commitmentQuestionMarkIcon = screen.getByTestId(
      'commitment-question-mark-icon'
    )

    fireEvent.mouseOver(commitmentQuestionMarkIcon)
    const tooltip = await screen.findByRole('tooltip')

    expect(tooltip).toHaveTextContent('Desired commitment: Hourly')
    fireEvent.mouseOut(commitment)
  })

  it('renders tooltip with commitment', async () => {
    arrangeTest(
      createJobListItemFragment({
        commitment: 'hourly',
        currentEngagement: {
          id: '123',
          commitment: EngagementCommitmentEnum.FULL_TIME,
          currentCommitment: { availability: CommitmentAvailability.full_time }
        },
        talentCount: 1,
        status: JobStatus.POSTPONED
      })
    )
    const commitment = screen.getByTestId('commitment-text')

    expect(commitment).toBeInTheDocument()

    const commitmentQuestionMarkIcon = screen.getByTestId(
      'commitment-question-mark-icon'
    )

    fireEvent.mouseOver(commitmentQuestionMarkIcon)

    const tooltip = await screen.findByRole('tooltip')

    expect(tooltip).toHaveTextContent('Commitment: Full-time')
    fireEvent.mouseOut(commitment)
  })
})
