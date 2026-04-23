import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { when } from 'jest-when'
import React from 'react'
import { useMutation } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import { JOB_UPDATED } from '../../messages'
import { ResumeSendingJobAwayDocument } from './data'
import RestoreSendingAwayModal from './RestoreSendingAwayModal'

jest.mock('@staff-portal/data-layer-service')
const mockUseMutation = useMutation as jest.Mock

jest.mock('@toptal/staff-portal-message-bus')
const mockUseMessageEmitter = useMessageEmitter as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(ResumeSendingJobAwayDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          resumeSendingJobAway: {
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
    .calledWith(ResumeSendingJobAwayDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])
}

const arrangeTest = (hideModal = () => {}) =>
  render(
    <TestWrapper>
      <RestoreSendingAwayModal jobId='1' hideModal={hideModal} />
    </TestWrapper>
  )

describe('RestoreSendingAwayModal', () => {
  describe('when there is an error', () => {
    it('shows the error message', async () => {
      mockErrorImplementation()
      arrangeTest()

      fireEvent.click(screen.getByText('Restore Sending Away'))

      expect(
        await screen.findByText('Unable to resume sending job away.')
      ).toBeInTheDocument()
    })
  })

  describe('when cancel button is pressed', () => {
    it('triggers the hide modal function', () => {
      const hideModal = jest.fn()

      mockSuccessImplementation()
      arrangeTest(hideModal)

      fireEvent.click(screen.getByText('Cancel'))

      expect(hideModal).toHaveBeenCalled()
    })
  })

  describe('when confirm restore sending job away', () => {
    it('shows the success message and triggers the emit message', async () => {
      const emitMessage = jest.fn()

      mockUseMessageEmitter.mockReturnValue(emitMessage)

      mockSuccessImplementation()
      arrangeTest()

      fireEvent.click(screen.getByText('Restore Sending Away'))

      expect(
        await screen.findByText('The Job was successfully restored.')
      ).toBeInTheDocument()

      expect(emitMessage).toHaveBeenCalledWith(JOB_UPDATED, { jobId: '1' })
    })
  })
})
