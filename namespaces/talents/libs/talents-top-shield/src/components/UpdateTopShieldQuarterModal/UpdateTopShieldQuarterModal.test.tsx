import React, { ComponentProps } from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { UpdateTopShieldQuarterFormFields } from './components'
import UpdateTopShieldQuarterModal from './UpdateTopShieldQuarterModal'
import { createQuarterMock } from '../../mocks'

const mockNotificationError = jest.fn()
const mockHandleMutationResult = jest.fn()
const mockUpdateTopShieldQuarter = jest.fn()

jest.mock('@toptal/picasso/utils', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: () => ({
    showError: mockNotificationError
  })
}))
jest.mock(
  '@staff-portal/mutation-result-handlers/src/form-error-handler',
  () => ({
    __esModule: true,
    useHandleMutationResult: () => ({
      handleMutationResult: mockHandleMutationResult
    })
  })
)
jest.mock('./hooks/use-update-top-shield-application-quarter', () => ({
  __esModule: true,
  useUpdateTopShieldApplicationQuarter: () => ({
    handleSubmit: mockUpdateTopShieldQuarter
  })
}))
jest.mock('./components/UpdateTopShieldQuarterFormFields')

const UpdateTopShieldQuarterFormFieldsMock =
  UpdateTopShieldQuarterFormFields as jest.Mock

const arrangeTest = (
  props: ComponentProps<typeof UpdateTopShieldQuarterModal>
) => {
  render(
    <TestWrapper>
      <UpdateTopShieldQuarterModal {...props} />
    </TestWrapper>
  )
}

describe('UpdateTopShieldQuarterModal', () => {
  beforeEach(() => {
    UpdateTopShieldQuarterFormFieldsMock.mockReturnValueOnce(null)
  })

  it('renders update top shield quarter modal', () => {
    const quarter = createQuarterMock()

    arrangeTest({
      ...quarter,
      hideModal: jest.fn()
    })

    expect(screen.getByText('Update Quarter')).toBeInTheDocument()
    expect(UpdateTopShieldQuarterFormFieldsMock).toHaveBeenCalledWith({}, {})
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument()
  })

  it('calls hideModal on close', () => {
    const hideModal = jest.fn()

    arrangeTest({
      ...createQuarterMock(),
      hideModal
    })

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(hideModal).toHaveBeenCalled()
  })

  it('calls mutation on submit', async () => {
    const quarter = createQuarterMock()

    arrangeTest({
      ...quarter,
      startDate: '2020-01-01',
      endDate: '2020-05-01',
      hideModal: jest.fn()
    })

    fireEvent.click(screen.getByTestId('button-complete'))

    await waitFor(() => {
      expect(mockUpdateTopShieldQuarter).toHaveBeenCalledWith(
        expect.objectContaining({
          startDate: '2020-01-01',
          endDate: '2020-05-01',
          paymentEndDate: quarter.paymentEndDate
        }),
        expect.anything(),
        expect.anything()
      )
    })
  })
})
