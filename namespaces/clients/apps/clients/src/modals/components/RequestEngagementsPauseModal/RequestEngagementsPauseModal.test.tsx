import React from 'react'
import { useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { act, fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import RequestEngagementsPauseModal from './RequestEngagementsPauseModal'

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
  useQueryMock.mockImplementationOnce(() => ({
    data: {
      node: {
        operations: {
          requestClientEngagementsPause: {
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
      <RequestEngagementsPauseModal companyId='123' hideModal={hideModal} />
    </TestWrapper>
  )
}

describe('RequestEngagementsPauseModal', () => {
  describe('when pressing cancel button', () => {
    it('triggers the hide modal callback function', () => {
      const hideModal = jest.fn()

      arrangeTest({ hideModal })

      fireEvent.click(screen.getByTestId('modal-cancel-button'))

      expect(hideModal).toHaveBeenCalled()
    })
  })

  describe('when pressing submit button', () => {
    const REASON = 'reason'

    describe('when form was submitted successfully', () => {
      it('shows success notification message', async () => {
        const hideModal = jest.fn()

        arrangeTest({ hideModal })

        fireEvent.change(screen.getByLabelText(/Comment/), {
          target: { value: REASON }
        })

        await act(async () => {
          await fireEvent.click(
            screen.getByTestId('ConfirmationModal-submit-button')
          )
        })

        expect(handleSubmitMock).toHaveBeenCalledTimes(1)
        expect(handleSubmitMock).toHaveBeenCalledWith({
          clientId: '123',
          comment: REASON
        })
        expect(hideModal).toHaveBeenCalledTimes(1)
      })
    })
  })
})
