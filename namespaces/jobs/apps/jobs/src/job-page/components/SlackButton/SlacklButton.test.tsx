import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import SlackButton, { Props } from './SlackButton'

const MOCK_CONTACT = [
  {
    id: 'some-id',
    webResource: {
      url: 'slackurl'
    }
  }
]

type Params = {
  variant: Props['variant']
}

const arrangeTest = ({ variant }: Params) =>
  render(
    <TestWrapper>
      <SlackButton variant={variant} slackContacts={MOCK_CONTACT} />
    </TestWrapper>
  )

describe('SlackButton', () => {
  it('renders slack button', () => {
    arrangeTest({ variant: 'menuItem' })

    expect(screen.getByText('Contact Via Slack')).toBeInTheDocument()
  })

  it('renders menu variant', () => {
    arrangeTest({
      variant: 'menuItem'
    })

    const menu = screen.getByTestId('SlackButton-menu')

    expect(menu).toBeInTheDocument()
    expect(menu).toHaveAttribute('href', 'slackurl')
  })

  it('renders button variant', () => {
    arrangeTest({
      variant: 'button'
    })

    expect(screen.getByTestId('SlackButton-button')).toBeInTheDocument()
  })
})
