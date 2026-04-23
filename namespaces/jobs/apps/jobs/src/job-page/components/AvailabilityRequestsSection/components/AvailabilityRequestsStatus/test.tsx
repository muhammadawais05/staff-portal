import React from 'react'
import { render, screen } from '@testing-library/react'
import { AvailabilityRequestStatus } from '@staff-portal/graphql/staff'
import { TestWrapper, assertOnTooltip } from '@staff-portal/test-utils'

import AvailabilityRequestsStatus, { Props } from './AvailabilityRequestsStatus'

const createStatusMocks = ({
  status = AvailabilityRequestStatus.PENDING,
  talentComment = '',
  rejectReason = null
}) => ({
  expirationReason: null,
  rejectReason,
  status,
  talentComment,
  availabilityRequestMetadata: {
    lowActivity: false,
    prediction: 0.1490207977315468,
    pending: 0,
    recentConfirmed: 1,
    recentRejected: 3
  }
})

const arrangeTest = (mocks: Props) => {
  render(
    <TestWrapper>
      <AvailabilityRequestsStatus {...mocks} />
    </TestWrapper>
  )
}

describe('AvailabilityRequestsStatus', () => {
  it('renders confirmed status', () => {
    const mocks = createStatusMocks({
      status: AvailabilityRequestStatus.CONFIRMED
    })

    arrangeTest(mocks)

    const status = screen.getByTestId('availability-request-status')

    expect(status).toHaveTextContent('Confirmed')
    expect(status.firstElementChild?.className).toMatch(/typography-green/i)
  })

  it('renders pending status with calculated prediction', () => {
    const mocks = createStatusMocks({
      status: AvailabilityRequestStatus.PENDING
    })

    arrangeTest(mocks)

    const status = screen.getByTestId('availability-request-status')

    expect(status.firstElementChild).toHaveTextContent('Pending(15%)')
    expect(status.firstElementChild?.className).toMatch(/typography-yellow/i)
  })

  it('renders cancelled status', () => {
    const mocks = createStatusMocks({
      status: AvailabilityRequestStatus.CANCELLED
    })

    arrangeTest(mocks)

    const status = screen.getByTestId('availability-request-status')

    expect(status.firstElementChild).toHaveTextContent('Cancelled')
    expect(status.firstElementChild?.className).toMatch(/typography-black/i)
  })

  it('renders expired status', () => {
    const mocks = createStatusMocks({
      status: AvailabilityRequestStatus.EXPIRED
    })

    arrangeTest(mocks)

    const status = screen.getByTestId('availability-request-status')

    expect(status.firstElementChild).toHaveTextContent('Expired')
    expect(status.firstElementChild?.className).toMatch(/typography-black/i)
  })

  it('renders rejected status', () => {
    const mocks = createStatusMocks({
      status: AvailabilityRequestStatus.REJECTED
    })

    arrangeTest(mocks)

    const status = screen.getByTestId('availability-request-status')

    expect(status.firstElementChild).toHaveTextContent('Rejected')
    expect(status.firstElementChild?.className).toMatch(/typography-red/i)
  })

  it('renders withdrawn status', () => {
    const mocks = createStatusMocks({
      status: AvailabilityRequestStatus.WITHDRAWN
    })

    arrangeTest(mocks)

    const status = screen.getByTestId('availability-request-status')

    expect(status.firstElementChild).toHaveTextContent('Withdrawn')
    expect(status.firstElementChild?.className).toMatch(/typography-black/i)
  })

  it('renders feedback icon with talent comment tooltip', () => {
    const talentComment = 'test comment'
    const mocks = createStatusMocks({
      talentComment
    })

    arrangeTest(mocks)

    const feedbackTooltip = screen.getByTestId(
      'availability-request-feedback-tooltip'
    )

    expect(feedbackTooltip).toBeInTheDocument()
    assertOnTooltip(feedbackTooltip, () => talentComment)
  })

  it('renders status info icon with tooltip', () => {
    const tooltipContent = 'Job type or specialization changed.'
    const mocks = createStatusMocks({
      status: AvailabilityRequestStatus.CANCELLED
    })

    arrangeTest(mocks)

    const statusTooltip = screen.getByTestId(
      'availability-request-status-tooltip'
    )

    expect(statusTooltip).toBeInTheDocument()
    assertOnTooltip(statusTooltip, () => tooltipContent)
  })
})
