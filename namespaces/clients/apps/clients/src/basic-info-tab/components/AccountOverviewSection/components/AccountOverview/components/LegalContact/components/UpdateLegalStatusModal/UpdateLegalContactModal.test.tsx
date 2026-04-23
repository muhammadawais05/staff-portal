import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import UpdateLegalContactModal from '.'
import { CompanyOverviewFragment } from '../../../../../../data'

jest.mock('../../../LegalContact/hooks/use-update-legal-contact', () => ({
  __esModule: true,
  default: () => ({
    handleSubmit: () => null,
    loading: false
  })
}))

const contact = {} as CompanyOverviewFragment['contact']

const renderComponent = () =>
  render(
    <TestWrapper>
      <UpdateLegalContactModal
        clientId='1'
        contact={contact}
        hideModal={() => null}
        signerEmail='SignerEmail'
        signerFullName='SignerFullName'
      />
    </TestWrapper>
  )

describe('UpdateLegalContactModal', () => {
  it('default render', () => {
    renderComponent()

    expect(screen.getByTestId('UpdateLegalContactModal')).toBeInTheDocument()
    expect(
      screen.getByTestId('UpdateLegalContactModal-form')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('UpdateLegalContactModal-title')
    ).toHaveTextContent('Update Legal Contact Details')
    expect(
      screen.getByTestId('UpdateLegalContactModal-customSigner')
    ).toBeInTheDocument()
  })
})
