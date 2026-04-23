import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import RestoreRejectedEngagementModal from './RestoreRejectedEngagementModal'
import { useRestoreRejectedEngagement } from './data'

jest.mock('./data', () => ({
  __esModule: true,
  useRestoreRejectedEngagement: jest.fn()
}))

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ConfirmationModal: ({ operationVariables, ...rest }: Record<string, any>) => {
    const ActualConfirmationModal = jest.requireActual(
      '@staff-portal/modals-service'
    ).ConfirmationModal

    return <ActualConfirmationModal {...rest} />
  }
}))

const arrangeTest = () => {
  window.Element.prototype.scrollIntoView = jest.fn()

  return render(
    <TestWrapper>
      <RestoreRejectedEngagementModal engagementId='123' hideModal={() => {}} />
    </TestWrapper>
  )
}

describe('RestoreRejectedEngagementModal', () => {
  it('renders and shows the success message after submit', async () => {
    const mockRestoreExpiredEngagement =
      useRestoreRejectedEngagement as jest.Mock

    mockRestoreExpiredEngagement.mockReturnValue([
      () => ({
        data: {
          restoreRejectedEngagement: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])

    arrangeTest()

    expect(screen.getByText('Restore Rejected Interview')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('ConfirmationModal-submit-button'))

    expect(
      await screen.findByText('Please complete this field.')
    ).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'Some Comment' }
    })

    fireEvent.click(screen.getByTestId('ConfirmationModal-submit-button'))

    expect(
      await screen.findByText('The Interview was successfully restored.')
    ).toBeInTheDocument()
  })

  it('shows the error message', async () => {
    const mockRestoreExpiredEngagement =
      useRestoreRejectedEngagement as jest.Mock

    mockRestoreExpiredEngagement.mockImplementation(
      ({ onError }: { onError: () => void }) => [
        () => onError(),
        { loading: false }
      ]
    )

    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'Some Comment' }
    })

    fireEvent.click(screen.getByTestId('ConfirmationModal-submit-button'))

    expect(
      await screen.findByText(
        'An error occurred, the Interview was not restored.'
      )
    ).toBeInTheDocument()
  })

  it('shows the error message received from the API', async () => {
    const ERROR_MESSAGE = 'Server error message'
    const mockRestoreExpiredEngagement =
      useRestoreRejectedEngagement as jest.Mock

    mockRestoreExpiredEngagement.mockReturnValue([
      () => ({
        data: {
          restoreRejectedEngagement: {
            success: false,
            errors: [
              {
                code: 'code',
                key: 'base',
                message: ERROR_MESSAGE
              }
            ]
          }
        }
      }),
      { loading: false }
    ])

    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'Some Comment' }
    })

    fireEvent.click(screen.getByTestId('ConfirmationModal-submit-button'))

    expect(await screen.findByText(ERROR_MESSAGE)).toBeInTheDocument()
  })
})
