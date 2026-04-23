import { useMutation } from '@staff-portal/data-layer-service'
import { useGetOperation } from '@staff-portal/operations'
import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { when } from 'jest-when'
import React from 'react'

import { RemoveNoteAttachmentDocument } from './data/remove-note-attachment/remove-note-attachment.staff.gql.types'
import RemoveNoteAttachmentModal from './RemoveNoteAttachmentModal'

jest.mock('@staff-portal/data-layer-service')

jest.mock(
  '@staff-portal/operations/src/components/LazyOperation/hooks/use-get-operation',
  () => ({
    __esModule: true,
    useGetOperation: jest.fn()
  })
)

const mockUseMutation = useMutation as jest.Mock
const mockUseGetOperation = useGetOperation as jest.Mock

const mockSuccessImplementation = () => {
  when(mockUseMutation)
    .calledWith(RemoveNoteAttachmentDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          removeNoteAttachment: {
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
    .calledWith(RemoveNoteAttachmentDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])
}

const renderComponent = ({
  hideModal = () => {}
}: { hideModal?: () => void } = {}) => {
  mockUseGetOperation.mockReturnValue({ enabled: true, loading: false })

  return render(
    <TestWrapper>
      <RemoveNoteAttachmentModal
        noteId='1'
        fileName='File Name'
        hideModal={hideModal}
      />
    </TestWrapper>
  )
}

describe('RemoveNoteAttachmentModal', () => {
  describe('when there is an error', () => {
    it('shows the error message', async () => {
      mockErrorImplementation()
      renderComponent()

      fireEvent.click(
        screen.getByTestId('remove-note-attachment-submit-button')
      )

      expect(
        await screen.findByText(
          'An error occurred, attachment was not deleted.'
        )
      ).toBeInTheDocument()
    })
  })

  describe('when cancel button is pressed', () => {
    it('triggers the hide modal function', () => {
      const hideModal = jest.fn()

      mockSuccessImplementation()
      renderComponent({ hideModal })

      fireEvent.click(screen.getByText('Cancel'))

      expect(hideModal).toHaveBeenCalled()
    })
  })

  describe('when confirm delete note', () => {
    it('shows the success message', async () => {
      const hideModal = jest.fn()

      mockSuccessImplementation()
      renderComponent({ hideModal })

      fireEvent.click(
        screen.getByTestId('remove-note-attachment-submit-button')
      )

      expect(
        await screen.findByText('Attachment has been deleted.')
      ).toBeInTheDocument()

      expect(hideModal).toHaveBeenCalled()
    })
  })
})
