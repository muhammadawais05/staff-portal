import { useMutation, useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { when } from 'jest-when'
import React from 'react'

import { CLIENT_UPDATED } from '../../messages'
import { ResumeClientDocument } from './data'
import ResumeCompanyModal from './ResumeCompanyModal'

jest.mock('@toptal/staff-portal-message-bus')
const mockUseMessageEmitter = useMessageEmitter as jest.Mock

jest.mock('@staff-portal/data-layer-service')
const mockUseMutation = useMutation as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(ResumeClientDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          resumeClient: {
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
    .calledWith(ResumeClientDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])
}

const arrangeTest = ({
  hideModal = () => {}
}: Partial<{ hideModal: () => void }> = {}) => {
  const useQueryMock = useQuery as jest.Mock

  useQueryMock.mockImplementationOnce(() => ({
    data: {
      node: {
        operations: {
          resumeClient: {
            callable: 'ENABLED'
          }
        }
      }
    },
    loading: false
  }))

  return render(
    <TestWrapper>
      <ResumeCompanyModal companyId='123' hideModal={hideModal} />
    </TestWrapper>
  )
}

describe('ResumeCompanyModal', () => {
  describe('when pressing cancel button', () => {
    it('triggers the hide modal callback function', () => {
      const hideModal = jest.fn()

      mockSuccessImplementation()
      arrangeTest({ hideModal })

      fireEvent.click(screen.getByTestId('modal-cancel-button'))

      expect(hideModal).toHaveBeenCalled()
    })
  })

  describe('when resume company was successfully', () => {
    it('shows success notification message', async () => {
      const COMMENT = 'Some comment'
      const emitMessage = jest.fn()

      mockUseMessageEmitter.mockReturnValue(emitMessage)

      mockSuccessImplementation()
      arrangeTest()

      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: COMMENT }
      })

      fireEvent.click(screen.getByTestId('ConfirmationModal-submit-button'))

      expect(
        await screen.findByText('Company has been resumed.')
      ).toBeInTheDocument()

      expect(emitMessage).toHaveBeenCalledWith(CLIENT_UPDATED, {
        companyId: '123'
      })
    })
  })

  describe('when resume company failed', () => {
    it('shows error notification message', async () => {
      const COMMENT = 'Some comment'
      const emitMessage = jest.fn()

      mockUseMessageEmitter.mockReturnValue(emitMessage)

      mockErrorImplementation()
      arrangeTest()

      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: COMMENT }
      })

      fireEvent.click(screen.getByTestId('ConfirmationModal-submit-button'))

      expect(
        await screen.findByText(
          'An error occurred, the company has not been resumed.'
        )
      ).toBeInTheDocument()

      expect(emitMessage).not.toHaveBeenCalled()
    })
  })
})
