import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { NegotiationStatus } from '@staff-portal/graphql/staff'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import UpdateNegotiationStatusForm from './UpdateNegotiationStatusForm'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

const renderComponent = () => {
  return render(
    <TestWrapper>
      <UpdateNegotiationStatusForm
        negotiationId='123'
        negotiationStatus={NegotiationStatus.WAITING_ON_CLIENT}
        companyName='Full Name'
        hideModal={() => {}}
      />
    </TestWrapper>
  )
}

const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock

describe('UpdateNegotiationStatusForm', () => {
  it('renders as expected', () => {
    useModalFormChangeHandlerMock.mockReturnValue({
      handleSubmit: () => {},
      loading: false
    })

    renderComponent()

    expect(
      screen.getByTestId('UpdateNegotiationStatusForm-form')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('UpdateNegotiationStatusForm-status')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('UpdateNegotiationStatusForm-submit')
    ).toBeInTheDocument()
  })
})
