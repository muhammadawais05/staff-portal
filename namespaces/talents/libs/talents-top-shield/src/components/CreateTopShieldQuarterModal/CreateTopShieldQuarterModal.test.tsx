import React, { ComponentProps } from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import CreateTopShieldQuarterModal from './CreateTopShieldQuarterModal'
import { createQuarterMock } from '../../mocks'

const mockNotificationError = jest.fn()
const mockHandleMutationResult = jest.fn()
const mockCreateTopShieldQuarter = jest.fn()

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
jest.mock('./hooks/use-create-top-shield-application-quarter', () => ({
  __esModule: true,
  useCreateTopShieldApplicationQuarter: () => ({
    handleSubmit: mockCreateTopShieldQuarter
  })
}))

const arrangeTest = (
  props: ComponentProps<typeof CreateTopShieldQuarterModal>
) => {
  render(
    <TestWrapper>
      <CreateTopShieldQuarterModal {...props} />
    </TestWrapper>
  )
}

describe('CreateTopShieldQuarterModal', () => {
  it('renders create top shield quarter modal', () => {
    const quarter = createQuarterMock()

    arrangeTest({
      ...quarter,
      hideModal: jest.fn()
    })

    expect(screen.getByText('Add Quarter')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
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
      hideModal: jest.fn()
    })

    fireEvent.change(screen.getByLabelText(/Eligible Start Date/), {
      target: { value: '2019-01-01' }
    })
    fireEvent.change(screen.getByLabelText(/Eligible End Date/), {
      target: { value: '2019-01-02' }
    })
    fireEvent.change(screen.getByLabelText(/Payment End Date/), {
      target: { value: '2019-01-05' }
    })
    fireEvent.click(screen.getByTestId('button-complete'))

    await waitFor(() => {
      expect(mockCreateTopShieldQuarter).toHaveBeenCalledWith(
        expect.objectContaining({
          endDate: '2019-01-02',
          paymentEndDate: '2019-01-05',
          startDate: '2019-01-01'
        }),
        expect.anything(),
        expect.anything()
      )
    })
  })
})
