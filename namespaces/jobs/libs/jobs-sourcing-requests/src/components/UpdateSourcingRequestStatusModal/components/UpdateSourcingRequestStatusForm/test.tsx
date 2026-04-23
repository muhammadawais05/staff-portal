import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { when } from 'jest-when'
import React from 'react'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { SourcingRequestStatus } from '@staff-portal/graphql/staff'

import UpdateSourcingRequestStatusForm from './UpdateSourcingRequestStatusForm'
import { UpdateSourcingRequestStatusDocument } from './data'

jest.mock('@toptal/staff-portal-message-bus')
const mockUseMessageEmitter = useMessageEmitter as jest.Mock

jest.mock('@staff-portal/data-layer-service')
const mockUseMutation = useMutation as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(UpdateSourcingRequestStatusDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          updateSourcingRequestStatus: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])
}

const mockErrorImplementation = () => {
  when(mockUseMutation)
    .calledWith(UpdateSourcingRequestStatusDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])
}

const arrangeTest = ({
  hideModal = () => {}
}: Partial<{ hideModal: () => void }> = {}) =>
  render(
    <TestWrapper>
      <UpdateSourcingRequestStatusForm
        jobId='123'
        sourcingRequestId='123'
        sourcingRequestStatus={SourcingRequestStatus.ACTIVE_SOURCING}
        hideModal={hideModal}
      />
    </TestWrapper>
  )

describe('UpdateSourcingRequestStatusForm', () => {
  describe('when pressing cancel button', () => {
    it('triggers the hide modal callback function', () => {
      const hideModal = jest.fn()

      mockSuccessImplementation()
      arrangeTest({ hideModal })

      fireEvent.click(screen.getByTestId('FormCancelButton'))

      expect(hideModal).toHaveBeenCalled()
    })
  })

  describe('when sourcing request status was successfully changed', () => {
    it('shows success notification message', async () => {
      const COMMENT = 'Some comment'
      const emitMessage = jest.fn()

      mockUseMessageEmitter.mockReturnValue(emitMessage)

      mockSuccessImplementation()
      arrangeTest()

      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: COMMENT }
      })

      fireEvent.click(screen.getByTestId('sourcing-request-status-submit'))

      expect(
        await screen.findByText(
          'The Sourcing Request Status was successfully updated.'
        )
      ).toBeInTheDocument()

      expect(emitMessage).toHaveBeenCalledWith(JOB_UPDATED, {
        jobId: '123'
      })
    })
  })

  describe('when sourcing request status was changed with errors', () => {
    it('shows success notification message', async () => {
      const COMMENT = 'Some comment'

      mockErrorImplementation()
      arrangeTest()

      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: COMMENT }
      })

      fireEvent.click(screen.getByTestId('sourcing-request-status-submit'))

      expect(
        await screen.findByText(
          'An error occurred, the Sourcing Request Status was not updated.'
        )
      ).toBeInTheDocument()
    })
  })
})
