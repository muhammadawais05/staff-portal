import React from 'react'
import { render, screen } from '@testing-library/react'
import { assertOnTooltipText, TestWrapper } from '@staff-portal/test-utils'

import ContractAndAgreementHeader from './ContractAndAgreementHeader'

const defaultProps = {
  webResource: {
    text: 'TEST_TEXT',
    url: 'TEST_URL'
  }
}

const arrangeTest = (props = defaultProps) => {
  return render(
    <TestWrapper>
      <ContractAndAgreementHeader {...props} />
    </TestWrapper>
  )
}

describe('ContractAndAgreementHeader', () => {
  it('renders the contract and agreement header', () => {
    arrangeTest()

    expect(screen.getByText(defaultProps.webResource.text)).toBeInTheDocument()
    expect(screen.getByTestId('document-link')).toHaveAttribute(
      'href',
      defaultProps.webResource.url
    )
  })

  it('displays a tooltip on the semi-monthly agreement', () => {
    const contractText = 'Semi-Monthly Payments Agreement'

    arrangeTest({
      webResource: {
        ...defaultProps.webResource,
        text: contractText
      }
    })

    assertOnTooltipText(
      screen.getByText(contractText),
      'Warning: talent email might not be available due to delayed communication tracking processing.'
    )
  })
})
