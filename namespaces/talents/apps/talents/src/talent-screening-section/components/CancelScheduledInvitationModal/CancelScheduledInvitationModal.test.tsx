import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import React from 'react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { MockedResponse } from '@staff-portal/data-layer-service/src'

import CancelScheduledInvitationModal from './CancelScheduledInvitationModal'
import { createCancelScheduledInterviewInvitationMock } from './data/mocks'
import { CancelScheduledInterviewInvitationDocument } from './data'

jest.mock('@staff-portal/mutation-result-handlers/src/form-error-handler')

const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock

const mockHideModal = jest.fn()
const mockHandleSubmit = jest.fn()

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

const roleStepId = 'roleStepId'
const talentId = 'talent-id'
const arrangeTest = (mock?: MockedResponse[]) => {
  useModalFormChangeHandlerMock.mockImplementation(() => {
    return {
      handleSubmit: mockHandleSubmit,
      loading: false
    }
  })

  return render(
    <TestWrapperWithMocks mocks={mock}>
      <CancelScheduledInvitationModal
        roleStepId={roleStepId}
        talentId={talentId}
        hideModal={mockHideModal}
      />
    </TestWrapperWithMocks>
  )
}

describe('CancelScheduledInvitationModal', () => {
  describe('when the modal is opened', () => {
    it('should render properly', () => {
      arrangeTest()

      expect(
        screen.getByRole('heading', {
          name: /cancel the scheduled invitation email/i
        })
      ).toBeInTheDocument()

      expect(screen.getByTestId('cancel-button')).toBeInTheDocument()

      expect(screen.getByTestId('confirm-button')).toBeInTheDocument()
    })

    describe('when the cancel button is clicked', () => {
      it('should hide the modal', () => {
        arrangeTest()

        fireEvent.click(screen.getByTestId('cancel-button'))

        expect(mockHideModal).toHaveBeenCalled()
      })
    })

    describe('when the confirm button is clicked', () => {
      it('should handle submit', async () => {
        arrangeTest([
          createCancelScheduledInterviewInvitationMock({
            roleStepId
          })
        ])

        fireEvent.click(screen.getByTestId('confirm-button'))

        await waitFor(() => {
          expect(useModalFormChangeHandlerMock).toHaveBeenCalledWith(
            expect.objectContaining({
              mutationDocument: CancelScheduledInterviewInvitationDocument,
              mutationResultOptions: {
                successNotificationMessage:
                  'Scheduled invitation email was canceled.',
                onSuccessAction: expect.any(Function)
              }
            })
          )
        })
      })
    })
  })
})
