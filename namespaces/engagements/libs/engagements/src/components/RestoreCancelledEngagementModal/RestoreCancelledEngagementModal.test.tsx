import { act, fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useQuery } from '@staff-portal/data-layer-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import RestoreCancelledEngagementModal from './RestoreCancelledEngagementModal'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

const useQueryMock = useQuery as jest.Mock
const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock

const handleSubmitMock = jest.fn()
const arrangeTest = ({
  hideModal = () => {}
}: Partial<{ hideModal: () => void }> = {}) => {
  window.Element.prototype.scrollIntoView = jest.fn()

  useQueryMock.mockImplementationOnce(() => ({
    data: {
      node: {
        operations: {
          restoreCancelledEngagement: {
            callable: 'ENABLED'
          }
        }
      }
    }
  }))
  useModalFormChangeHandlerMock.mockImplementation(
    ({ mutationResultOptions: { onSuccessAction } }) => {
      onSuccessAction()

      return {
        handleSubmit: handleSubmitMock,
        loading: false
      }
    }
  )

  return render(
    <TestWrapper>
      <RestoreCancelledEngagementModal
        engagementId='123'
        hideModal={hideModal}
      />
    </TestWrapper>
  )
}

describe('RestoreCancelledEngagementModal', () => {
  it('renders and shows the success message after submit', async () => {
    const hideModal = jest.fn()

    arrangeTest({ hideModal })

    expect(screen.getByText('Restore Cancelled Interview')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('ConfirmationModal-submit-button'))

    expect(
      await screen.findByText('Please complete this field.')
    ).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'Some Comment' }
    })

    await act(async () => {
      await fireEvent.click(
        screen.getByTestId('ConfirmationModal-submit-button')
      )

      expect(handleSubmitMock).toHaveBeenCalledTimes(1)
      expect(handleSubmitMock).toHaveBeenCalledWith({
        engagementId: '123',
        comment: 'Some Comment'
      })
      expect(hideModal).toHaveBeenCalledTimes(1)

      expect(useModalFormChangeHandlerMock).toHaveBeenCalledWith(
        expect.objectContaining({
          mutationResultOptions: expect.objectContaining({
            successNotificationMessage:
              'The Interview was successfully restored.'
          })
        })
      )
    })
  })
})
