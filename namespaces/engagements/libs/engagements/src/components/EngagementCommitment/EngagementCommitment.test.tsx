import React from 'react'
import { render, screen } from '@testing-library/react'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import EngagementCommitment from '../EngagementCommitment'

const arrangeTest = (
  commitment: EngagementCommitmentEnum,
  commitmentHours?: number
) =>
  render(
    <TestWrapper>
      <EngagementCommitment
        commitment={commitment}
        commitmentHours={commitmentHours}
      />
    </TestWrapper>
  )

describe('Engagement commitment', () => {
  it('renders hourly commmitment', () => {
    arrangeTest(EngagementCommitmentEnum.HOURLY)

    expect(screen.getByText('Hourly')).toHaveAttribute('data-color', 'yellow')
  })

  it('renders part-time commmitment', () => {
    arrangeTest(EngagementCommitmentEnum.PART_TIME)

    expect(screen.getByText('Part-time')).toHaveAttribute(
      'data-color',
      'yellow'
    )
  })

  it('renders full-time commmitment', () => {
    arrangeTest(EngagementCommitmentEnum.FULL_TIME)

    expect(screen.getByText('Full-time')).toHaveAttribute('data-color', 'green')
  })

  describe('when `commitmentHours` is passed and the engagement commitment is `HOURLY`', () => {
    it('shows the hours', () => {
      arrangeTest(EngagementCommitmentEnum.HOURLY, 20)

      expect(screen.getByText('Hourly (20 hours)')).toBeInTheDocument()
    })
  })

  describe('when `commitmentHours` is passed and the engagement commitment is not `HOURLY`', () => {
    it('does not show the hours', () => {
      arrangeTest(EngagementCommitmentEnum.FULL_TIME, 20)

      expect(screen.queryByText('Full-time (20 hours)')).not.toBeInTheDocument()
    })
  })
})
