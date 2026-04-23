import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import StartNegotiationForm from './StartNegotiationForm'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

const renderComponent = () => {
  return render(
    <TestWrapper>
      <StartNegotiationForm
        companyId='123'
        companyName='Full Name'
        hideModal={() => {}}
      />
    </TestWrapper>
  )
}

const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock

describe('StartNegotiationForm', () => {
  it('renders as expected', () => {
    useModalFormChangeHandlerMock.mockReturnValue({
      handleSubmit: () => {},
      loading: false
    })

    renderComponent()

    expect(screen.getByTestId('StartNegotiationModal-form')).toBeInTheDocument()
    expect(
      screen.getByTestId('StartNegotiationModal-contactEmail')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('StartNegotiationModal-status')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('StartNegotiationModal-submit')
    ).toBeInTheDocument()
  })
})
