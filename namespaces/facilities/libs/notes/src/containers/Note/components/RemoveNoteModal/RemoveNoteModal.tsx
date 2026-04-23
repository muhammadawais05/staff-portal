import React, { useCallback } from 'react'
import { NodeType } from '@staff-portal/graphql'
import { PromptModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import { RemoveNoteDocument } from './data/remove-note/remove-note.staff.gql.types'

interface Props {
  noteId: string
  title: string
  hideModal: () => void
  onDelete?: () => void
}

const RemoveNoteModal = ({ noteId, title, hideModal, onDelete }: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: RemoveNoteDocument,
      mutationResultOptions: {
        successNotificationMessage: 'Note has been deleted.',
        onSuccessAction: () => {
          onDelete?.()
          hideModal()
        }
      },
      errorNotificationMessage: 'An error occurred, was not deleted.'
    })

  const handleSubmit = useCallback(
    () => handleMutationSubmit({ noteId }),
    [handleMutationSubmit, noteId]
  )

  return (
    <PromptModal
      open
      loading={loading}
      onClose={hideModal}
      title={`Delete Note: "${title.trim()}"`}
      submitText='Delete Note'
      variant='negative'
      message='Are you sure that you want to delete this note?'
      onSubmit={handleSubmit}
      operationVariables={{
        nodeId: noteId,
        nodeType: NodeType.NOTE,
        operationName: 'removeNote'
      }}
      testIds={{ submitButton: 'remove-note-submit-button' }}
    />
  )
}

export default RemoveNoteModal
