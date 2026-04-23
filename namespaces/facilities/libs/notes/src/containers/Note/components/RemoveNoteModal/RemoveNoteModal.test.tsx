import { useMutation } from '@staff-portal/data-layer-service'
import { useGetOperation } from '@staff-portal/operations'
import { TestWrapper } from '@staff-portal/test-utils'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import { when } from 'jest-when'
import React from 'react'

import { RemoveNoteDocument } from './data/remove-note/remove-note.staff.gql.types'
import RemoveNoteModal from './RemoveNoteModal'

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
    .calledWith(RemoveNoteDocument, expect.anything())
    .mockImplementation(() => [
      () => ({
        data: {
          removeNote: {
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
    .calledWith(RemoveNoteDocument, expect.anything())
    .mockImplementation((_, { onError }: { onError: () => void }) => [
      onError,
      { loading: false }
    ])
}

const renderComponent = ({
  hideModal = () => {},
  onDelete
}: { hideModal?: () => void; onDelete?: () => void } = {}) => {
  mockUseGetOperation.mockReturnValue({ enabled: true, loading: false })

  return render(
    <TestWrapper>
      <RemoveNoteModal
        noteId='1'
        title='Note Title'
        hideModal={hideModal}
        onDelete={onDelete}
      />
    </TestWrapper>
  )
}

describe('RemoveNoteModal', () => {
  describe('when there is an error', () => {
    it('shows the error message', async () => {
      mockErrorImplementation()
      renderComponent()

      fireEvent.click(screen.getByTestId('remove-note-submit-button'))

      expect(
        await screen.findByText('An error occurred, was not deleted.')
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
      const onDelete = jest.fn()

      mockSuccessImplementation()
      renderComponent({ hideModal, onDelete })

      fireEvent.click(screen.getByTestId('remove-note-submit-button'))

      expect(
        await screen.findByText('Note has been deleted.')
      ).toBeInTheDocument()

      expect(onDelete).toHaveBeenCalled()
      expect(hideModal).toHaveBeenCalled()
    })
  })
})
