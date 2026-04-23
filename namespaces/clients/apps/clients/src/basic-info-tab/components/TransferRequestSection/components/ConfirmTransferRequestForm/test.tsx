import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import ConfirmTransferRequestForm from './ConfirmTransferRequestForm'

jest.mock('@staff-portal/mutation-result-handlers/src/hooks', () => ({
  useModalFormChangeHandler: jest.fn()
}))

const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock

const arrangeTest = () =>
  render(
    <TestWrapper>
      <ConfirmTransferRequestForm
        hideModal={jest.fn()}
        requestedTransferId='123'
        transferRequestid='123'
        companyId='123'
        options={[
          {
            text: 'Alex Khudyakov (Stafff)',
            value: 'VjEtU3RhZmYtMjY1NDU1Mw'
          },
          {
            text: 'Astrid Bahringer (Staff)',
            value: 'VjEtU3RhZmYtMjMzMDY3Ng'
          }
        ]}
      />
    </TestWrapper>
  )

describe('ConfirmTransferRequestForm', () => {
  it('renders copies and buttons', () => {
    useModalFormChangeHandlerMock.mockReturnValue({
      handleSubmit: () => {},
      loading: false
    })
    arrangeTest()

    expect(screen.getByText('Confirm Transfer Request')).toBeInTheDocument()
    expect(
      screen.getByTestId('ConfirmTransferRequestModal-select')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('ConfirmTransferRequestModal-comment')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('ConfirmTransferRequestModal-submit')
    ).toBeInTheDocument()
  })
})
