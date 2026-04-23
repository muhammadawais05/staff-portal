import { render, screen, fireEvent, act } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import AddContactModal from './AddContactModal'
import useAddContactModal, {
  ADD_NEW_COMPANY_CONTACT_OPTION
} from '../hooks/use-add-contact'

jest.mock('../hooks/use-add-contact', () => ({
  __esModule: true,
  ...jest.requireActual('../hooks/use-add-contact'),
  default: jest.fn()
}))

const mockUseAddContactModal = useAddContactModal as jest.Mock<
  ReturnType<typeof useAddContactModal>
>

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <AddContactModal
        jobId='some-id'
        hideModal={() => {}}
        clientId='1'
        contacts={[]}
      />
    </TestWrapper>
  )
}

describe('AddContactModal', () => {
  it('submit new contact', async () => {
    const CONTACT_NAME = 'John Doe'
    const handleSubmitMock = jest.fn()

    mockUseAddContactModal.mockReturnValue({
      representativesOptions: [ADD_NEW_COMPANY_CONTACT_OPTION],
      handleSubmit: handleSubmitMock,
      mutationLoading: false
    })

    const { getByTestId } = arrangeTest()

    fireEvent.change(screen.getByLabelText(/Job Contact/i), {
      target: { value: CONTACT_NAME }
    })

    const submitButton = getByTestId('AddContactModal-submit-button')

    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(handleSubmitMock).toHaveBeenCalledTimes(1)
    expect(handleSubmitMock).toHaveBeenCalledWith(
      {
        representativeId: CONTACT_NAME
      },
      expect.anything(),
      expect.anything()
    )
  })
})
