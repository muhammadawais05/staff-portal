import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import ConfirmationModalContent, { Props } from './ConfirmationModalContent'

const arrangeTest = ({ showClaimerWarning = true }: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <ConfirmationModalContent showClaimerWarning={showClaimerWarning} />
    </TestWrapper>
  )

describe('ConfirmationModalContent', () => {
  it('renders the correct text', () => {
    arrangeTest({ showClaimerWarning: true })

    expect(
      screen.getByText('Are you sure you want to reschedule this interview?')
    ).toBeInTheDocument()
  })

  describe('when `showClaimerWarning` is true', () => {
    it('renders the alert', () => {
      arrangeTest({ showClaimerWarning: true })

      expect(
        screen.getByText(
          'This job is not claimed by you. The job claimer will receive interview feedback.'
        )
      ).toBeInTheDocument()
    })
  })

  describe('when `showClaimerWarning` is false', () => {
    it('does not render the alert', () => {
      arrangeTest({ showClaimerWarning: false })

      expect(
        screen.queryByText(
          'This job is not claimed by you. The job claimer will receive interview feedback.'
        )
      ).not.toBeInTheDocument()
    })
  })
})
