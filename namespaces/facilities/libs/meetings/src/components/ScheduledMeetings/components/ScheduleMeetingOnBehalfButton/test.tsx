import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import ScheduleMeetingOnBehalfButton, {
  Props
} from './ScheduleMeetingOnBehalfButton'

const defaultProps: Props = {
  type: 'ProductManager',
  roleTitle: 'Product manager',
  scheduleMeetingUrl: 'https://someurl.com'
}

const arrangeTest = ({ type, roleTitle, scheduleMeetingUrl } = defaultProps) =>
  render(
    <TestWrapper>
      <ScheduleMeetingOnBehalfButton
        type={type}
        roleTitle={roleTitle}
        scheduleMeetingUrl={scheduleMeetingUrl}
      />
    </TestWrapper>
  )

describe('ScheduleMeetingOnBehalfButton', () => {
  it('links to schedule meeting on behalf of role page', () => {
    const scheduleMeetingUrl = 'https://someurl.com/testing'

    arrangeTest({ ...defaultProps, scheduleMeetingUrl })

    expect(
      screen.getByRole('button', {
        name: 'Schedule Meeting on Behalf of Product Manager'
      })
    ).toHaveAttribute('href', scheduleMeetingUrl)
  })

  it('is disabled when link to schedule meeting on behalf of role is not defined', async () => {
    arrangeTest({ ...defaultProps, scheduleMeetingUrl: '' })

    const button = screen.getByRole('button', {
      name: 'Schedule Meeting on Behalf of Product Manager'
    })

    expect(button).toHaveAttribute('aria-disabled', 'true')

    assertOnTooltipText(
      button,
      'Please add booking page to be able to schedule meetings'
    )
  })
})
