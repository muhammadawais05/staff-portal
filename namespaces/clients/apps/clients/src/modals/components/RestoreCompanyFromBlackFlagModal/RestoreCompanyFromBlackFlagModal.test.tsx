import { useMutation, useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { when } from 'jest-when'
import React from 'react'
import { CLIENT_UPDATED } from '@staff-portal/clients'

import { RestoreClientFromBlackFlagDocument } from './data'
import RestoreCompanyFromBlackFlagModal from './RestoreCompanyFromBlackFlagModal'

jest.mock('@toptal/staff-portal-message-bus')
const mockUseMessageEmitter = useMessageEmitter as jest.Mock

jest.mock('@staff-portal/data-layer-service')
const mockUseMutation = useMutation as jest.Mock
const useQueryMock = useQuery as jest.Mock

jest.mock(
  '../RestoreCompanyFromBlackFlagModalContent/RestoreCompanyFromBlackFlagModalContent',
  () => ({
    __esModule: true,
    default: () => (
      <div data-testid='restore-company-from-black-flag-modal-content' />
    )
  })
)

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(RestoreClientFromBlackFlagDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          restoreClientFromBlackFlag: {
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
    .calledWith(RestoreClientFromBlackFlagDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])
}

const arrangeTest = ({
  hideModal = () => {}
}: Partial<{ hideModal: () => void }> = {}) => {
  useQueryMock.mockImplementationOnce(() => ({
    data: {
      node: {
        operations: {
          restoreClientFromBlackFlag: {
            callable: 'ENABLED'
          }
        }
      }
    },
    loading: false
  }))

  return render(
    <TestWrapper>
      <RestoreCompanyFromBlackFlagModal companyId='123' hideModal={hideModal} />
    </TestWrapper>
  )
}

describe('RestoreCompanyFromBlackFlagModal', () => {
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

      expect(
        screen.getByTestId('restore-company-from-black-flag-modal-content')
      ).toBeInTheDocument()

      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: COMMENT }
      })

      fireEvent.click(screen.getByTestId('ConfirmationModal-submit-button'))

      expect(
        await screen.findByText(
          'Company has been restored from Black Flag status.'
        )
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
          'An error occurred, the company has not been restored.'
        )
      ).toBeInTheDocument()

      expect(emitMessage).not.toHaveBeenCalled()
    })
  })
})
