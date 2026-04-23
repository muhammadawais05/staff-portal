import React from 'react'
import { screen, render } from '@testing-library/react'
import {
  TestWrapperWithMocks,
  assertOnTooltipText
} from '@staff-portal/test-utils'
import { createGetCurrentUserMock } from '@staff-portal/current-user/src/mocks'

import DeltaWaitingTimeField, { Props } from './DeltaWaitingTimeField'

const defaultProps: Props = {
  deltaWaitingDays: 0,
  lastClosedEngagementEndDate: null,
  lastAvailabilityIncreaseDate: '2020-10-27',
  trialsNumber: 4
}

const arrangeTest = (props = defaultProps) =>
  render(
    <TestWrapperWithMocks mocks={[createGetCurrentUserMock()]}>
      <DeltaWaitingTimeField {...props} />
    </TestWrapperWithMocks>
  )

describe('DeltaWaitingTimeField', () => {
  describe('waiting days', () => {
    it("shows 'not active'", () => {
      arrangeTest({ ...defaultProps, deltaWaitingDays: null })

      expect(screen.getByText('Not active')).toBeInTheDocument()
    })

    it('shows singular day', () => {
      const deltaWaitingDays = 1

      arrangeTest({ ...defaultProps, deltaWaitingDays })

      expect(screen.getByText(`${deltaWaitingDays} day`)).toBeInTheDocument()
    })

    it('shows plural days', () => {
      const deltaWaitingDays = 5

      arrangeTest({ ...defaultProps, deltaWaitingDays })

      expect(screen.getByText(`${deltaWaitingDays} days`)).toBeInTheDocument()
    })
  })

  describe('last engagement data', () => {
    it('shows the date', async () => {
      arrangeTest({
        ...defaultProps,
        lastClosedEngagementEndDate: '2020-10-27'
      })

      assertOnTooltipText(
        screen.getByTestId('waiting-time-tooltip-icon'),
        /Last engagement date: 2020-10-27/i
      )
    })

    it('shows "never engaged before"', async () => {
      arrangeTest({
        ...defaultProps,
        trialsNumber: 0
      })

      assertOnTooltipText(
        screen.getByTestId('waiting-time-tooltip-icon'),
        /Last engagement date: never engaged before/i
      )
    })

    it('shows "in progress"', async () => {
      arrangeTest({
        ...defaultProps,
        trialsNumber: 1
      })

      assertOnTooltipText(
        screen.getByTestId('waiting-time-tooltip-icon'),
        /Last engagement date: in progress/i
      )
    })
  })

  describe('last time increased availability', () => {
    it('shows the date', () => {
      arrangeTest({
        ...defaultProps,
        lastAvailabilityIncreaseDate: '2020-10-29'
      })

      assertOnTooltipText(
        screen.getByTestId('waiting-time-tooltip-icon'),
        /Last time increased availability: 2020-10-29/i
      )
    })

    it('shows inactive', () => {
      arrangeTest({
        ...defaultProps,
        lastAvailabilityIncreaseDate: null
      })

      assertOnTooltipText(
        screen.getByTestId('waiting-time-tooltip-icon'),
        /Last time increased availability: inactive/i
      )
    })
  })
})
