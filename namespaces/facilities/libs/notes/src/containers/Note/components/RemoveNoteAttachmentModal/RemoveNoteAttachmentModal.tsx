import { NodeType } from '@staff-portal/graphql'
import { PromptModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import React, { useCallback } from 'react'

import { RemoveNoteAttachmentDocument } from './data/remove-note-attachment/remove-note-attachment.staff.gql.types'

interface Props {
  noteId: string
  fileName: string
  hideModal: () => void
}

const RemoveNoteAttachmentModal = ({ noteId, fileName, hideModal }: Props) => {
  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: RemoveNoteAttachmentDocument,
      mutationResultOptions: {
        successNotificationMessage: 'Attachment has been deleted.',
        onSuccessAction: hideModal
      },
      errorNotificationMessage: 'An error occurred, attachment was not deleted.'
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
      title='Delete Attachment'
      submitText='Delete Attachment'
      variant='negative'
      message={`Are you sure you want to delete "${fileName}"?`}
      onSubmit={handleSubmit}
      operationVariables={{
        nodeId: noteId,
        nodeType: NodeType.NOTE,
        operationName: 'removeNoteAttachment'
      }}
      testIds={{ submitButton: 'remove-note-attachment-submit-button' }}
    />
  )
}

export default RemoveNoteAttachmentModal
