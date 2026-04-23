import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EmailStatusPanelHeader from '.'

const render = () =>
  renderComponent(
    <table>
      <EmailStatusPanelHeader />
    </table>
  )

describe('EmailStatusPanelHeader', () => {
  it('renders expected header elements', () => {
    const { getByTestId } = render()

    expect(getByTestId('EmailStatusPanelHeader')).toBeInTheDocument()
    expect(getByTestId('EmailStatusPanelHeader-recipient').textContent).toBe(
      'Recipient'
    )
    expect(getByTestId('EmailStatusPanelHeader-status').textContent).toBe(
      'Status'
    )
    expect(getByTestId('EmailStatusPanelHeader-message').textContent).toBe(
      'Message'
    )
  })
})
