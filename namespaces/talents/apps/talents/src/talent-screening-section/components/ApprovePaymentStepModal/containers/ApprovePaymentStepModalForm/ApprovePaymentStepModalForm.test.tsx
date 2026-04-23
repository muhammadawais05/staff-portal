import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import ApprovePaymentStepModalForm from './ApprovePaymentStepModalForm'

const renderComponent = () =>
  render(
    <TestWrapperWithMocks>
      <ApprovePaymentStepModalForm
        talentId='talent-id'
        roleStepId='1'
        claimer={{ id: '23', fullName: 'Andrei Mocanu' }}
        hideModal={jest.fn}
      />
    </TestWrapperWithMocks>
  )

describe('ApprovePaymentStepModalForm', () => {
  it('renders the modal form', () => {
    renderComponent()

    expect(screen.getByText('Approve Payment Details')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Do you really want to approve the Payment Details step?'
      )
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/Hourly rate/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Comment/)).toBeInTheDocument()
  })
})
