import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import ApproveApplicationButton from './ApproveApplicationButton'

const APPROVE_LINK_PATH =
  'https://staging.toptal.net/platform/staff/engagements/new'

const APPROVE_TOOLTIP_CONTENT =
  'Quibusdam officiis saepe laboriosam fugiat nobis laboriosam suscipit.'

const arrangeTest = () => {
  render(
    <TestWrapper>
      <ApproveApplicationButton
        jobApplication={{
          approveUrl: APPROVE_LINK_PATH,
          approveUrlTooltip: APPROVE_TOOLTIP_CONTENT
        }}
      />
    </TestWrapper>
  )
}

describe('ApproveApplicationButton', () => {
  it('renders approve button', () => {
    arrangeTest()

    const approveLink = screen.getByTestId('approve-link')

    expect(approveLink).toBeInTheDocument()
    expect(approveLink).toHaveAttribute('href', APPROVE_LINK_PATH)
  })

  it('renders disabled approve button with tooltip', () => {
    arrangeTest()

    assertOnTooltipText(screen.getByText(/approve/i), APPROVE_TOOLTIP_CONTENT)
  })
})
