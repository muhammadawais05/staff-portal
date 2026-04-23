import React from 'react'
import { render, screen } from '@testing-library/react'
import { SourcingRequestStatus } from '@staff-portal/graphql/staff'
import { assertOnTooltip, TestWrapper } from '@staff-portal/test-utils'

import SourcingRequestStatusComponent from '../SourcingRequestStatusComponent'

const arrangeTest = (status: SourcingRequestStatus) => {
  return render(
    <TestWrapper>
      <SourcingRequestStatusComponent status={status} />
    </TestWrapper>
  )
}

describe('SourcingRequestStatus', () => {
  it('should render colored status with message', async () => {
    arrangeTest(SourcingRequestStatus.ACTIVE_SOURCING)

    expect(await screen.findByText('Active Sourcing')).toBeInTheDocument()

    const infoIcon = screen.getByTestId('tooltip-icon')

    assertOnTooltip(infoIcon, tooltip => {
      expect(tooltip).toHaveTextContent(
        `This request was accepted. Sourcing is active.`
      )
    })
  })
})
