import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper, assertOnTooltip } from '@staff-portal/test-utils'

import TalentAvailabilityRequests, { Props } from './TalentAvailabilityRequests'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <TalentAvailabilityRequests {...props} />
    </TestWrapper>
  )

describe('TalentAvailabilityRequests', () => {
  describe('when talent activity is normal', () => {
    it('shows "normal" availability request label', () => {
      arrangeTest({
        lowActivity: false,
        pending: 1,
        prediction: 0.1570123,
        recentConfirmed: 1,
        recentRejected: 0
      })

      expect(
        screen.getByTestId('talent-availability-requests')
      ).toBeInTheDocument()
      expect(screen.getByText('Normal')).toBeInTheDocument()
    })

    it('shows tooltip with legend', async () => {
      arrangeTest({
        lowActivity: false,
        pending: 1,
        prediction: 0.1870123,
        recentConfirmed: 2,
        recentRejected: 3
      })

      const availabilityRequestsIcon = screen.getByTestId(
        'talent-availability-requests-tooltip'
      )

      assertOnTooltip(availabilityRequestsIcon, tooltip => {
        expect(tooltip).toHaveTextContent(/availability request statistics/i)
        expect(tooltip).toHaveTextContent(/acceptance prediction rate: 19%/i)
        expect(tooltip).toHaveTextContent(/recently accepted: 2/i)
        expect(tooltip).toHaveTextContent(/recently rejected: 3/i)
      })
    })
  })

  describe('when talent activity is low', () => {
    it('shows "low" availability request label', () => {
      arrangeTest({
        lowActivity: true,
        pending: 1,
        prediction: 0.1570123,
        recentConfirmed: 1,
        recentRejected: 0
      })

      expect(
        screen.getByTestId('talent-availability-requests')
      ).toBeInTheDocument()
      expect(screen.getByText('Low')).toBeInTheDocument()
    })

    it('shows tooltip with custom label', async () => {
      arrangeTest({
        lowActivity: true,
        pending: 1,
        prediction: 0.1870123,
        recentConfirmed: 2,
        recentRejected: 3
      })

      const availabilityRequestsIcon = screen.getByTestId(
        'talent-availability-requests-tooltip'
      )

      assertOnTooltip(availabilityRequestsIcon, tooltip => {
        expect(tooltip).toHaveTextContent(
          /talent has low-activity, he is not likely to accept a new ar/i
        )
        expect(tooltip).toHaveTextContent(/acceptance prediction rate: 19%/i)
        expect(tooltip).toHaveTextContent(/recently accepted: 2/i)
        expect(tooltip).toHaveTextContent(/recently rejected: 3/i)
      })
    })
  })
})
