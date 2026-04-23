import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import RepeatedClientsField, { Props } from './RepeatedClientsField'

const defaultProps: Props = {
  clientsNumber: 2,
  repeatedClientsNumber: 1
}

const arrangeTest = (props = defaultProps) =>
  render(
    <TestWrapper>
      <RepeatedClientsField {...props} />
    </TestWrapper>
  )

describe('RepeatedClientsField', () => {
  it('shows number of clients and repeated clients', async () => {
    const clientsNumber = 3
    const repeatedClientsNumber = 5

    arrangeTest({
      ...defaultProps,
      clientsNumber,
      repeatedClientsNumber
    })

    expect(
      screen.getByText(`${repeatedClientsNumber} (${clientsNumber})`)
    ).toBeInTheDocument()

    const tooltipIcon = screen.getByTestId('repeated-clients-tooltip-icon')

    assertOnTooltipText(
      tooltipIcon,
      new RegExp(`Repeated clients: ${repeatedClientsNumber}`)
    )

    assertOnTooltipText(
      tooltipIcon,
      new RegExp(`Total clients: ${clientsNumber}`)
    )
  })

  describe('when never engaged', () => {
    it('shows never engaged message', () => {
      arrangeTest({ ...defaultProps, clientsNumber: 0 })

      expect(screen.getByText('Never engaged before')).toBeInTheDocument()
    })
  })
})
