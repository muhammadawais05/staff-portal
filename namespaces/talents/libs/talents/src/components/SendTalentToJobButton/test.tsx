import React from 'react'
import { render, screen } from '@testing-library/react'
import { assertOnTooltipText, TestWrapper } from '@staff-portal/test-utils'

import SendTalentToJobButton, { Props } from './SendTalentToJobButton'

const defaultProps = {
  suspended: false,
  fullName: 'Talent full name',
  sendToJobUrl: 'https://domain.com/send-talent-to-job'
}

const arrangeTest = (props: Props = defaultProps) =>
  render(
    <TestWrapper>
      <SendTalentToJobButton {...props} />
    </TestWrapper>
  )

describe('SendTalentToJobButton', () => {
  it('is hidden if sendToJobUrl is not available', () => {
    arrangeTest({ ...defaultProps, sendToJobUrl: '' })

    expect(screen.queryByText('Send to Job')).not.toBeInTheDocument()
  })

  it('is disabled with tooltip if the talent is suspended', async () => {
    const fullName = 'Test Talent'

    arrangeTest({ ...defaultProps, suspended: true, fullName })

    const button = screen.getByRole('button')

    assertOnTooltipText(
      button,
      `${fullName} is suspended and cannot be sent to job.`
    )

    expect(button).toHaveAttribute('aria-disabled', 'true')
  })

  it('is enabled and sends talent to job', () => {
    const sendToJobUrl = 'https://test-domain.com/send-to-job-url'

    arrangeTest({ ...defaultProps, sendToJobUrl })

    expect(screen.getByRole('button')).toHaveAttribute('href', sendToJobUrl)
  })
})
