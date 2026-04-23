import { useNotifications } from '@toptal/picasso/utils'
import { useTranslation } from 'react-i18next'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import {
  RemoveNoteAttachmentInput,
  RemoveNoteInput
} from '@staff-portal/graphql/staff'
import { ErrorResponse } from '@apollo/client/link/error'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { getMutationErrorMessage } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { useConfirmations } from '@staff-portal/billing/src/_lib/customHooks/useConfirmations'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'

import { useRemoveNoteMutation } from '../../data/mutationNoteDelete.graphql.types'
import { useRemoveNoteAttachmentMutation } from '../../data/mutationNoteDeleteAttachment.graphql.types'

export const useActionsNote = () => {
  const { handleOnRootLevelError } = useFormSubmission()
  const { showError, showSuccess } = useNotifications()
  const { t: translate } = useTranslation('notes')
  const emitMessage = useMessageEmitter()
  const { handleOnOpenConfirmation, handleOnCloseConfirmation } =
    useConfirmations()
  const [subscribeMutationNoteDelete] = useRemoveNoteMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const [subscribeMutationNoteDeleteAttachment] =
    useRemoveNoteAttachmentMutation({
      onRootLevelError: handleOnRootLevelError
    })

  const handleOnDeleteSuccess = async (noteId: string) => {
    const variables: RemoveNoteInput = {
      noteId
    }

    try {
      await subscribeMutationNoteDelete({
        variables
      })
      handleOnCloseConfirmation()
      emitMessage(ApolloContextEvents.noteDelete)
      showSuccess(translate('notification.success.delete'))
    } catch (error) {
      showError(getMutationErrorMessage(error as ErrorResponse))
    }
  }

  const handleOnDelete = (noteId: string, noteTitle: string) =>
    handleOnOpenConfirmation({
      actionTitle: translate('modal.note.confirm'),
      description: translate('modal.note.description'),
      onSuccess: () => handleOnDeleteSuccess(noteId),
      title: translate('modal.note.title', { name: noteTitle })
    })

  const handleOnDeleteAttachmentSuccess = async (noteId: string) => {
    const variables: RemoveNoteAttachmentInput = {
      noteId
    }

    try {
      await subscribeMutationNoteDeleteAttachment({
        variables
      })
      handleOnCloseConfirmation()
      emitMessage(ApolloContextEvents.noteDeleteAttachment)
      showSuccess(translate('notification.success.deleteAttachment'))
    } catch (error) {
      showError(getMutationErrorMessage(error as ErrorResponse))
    }
  }

  const handleOnDeleteAttachment = (noteId: string, noteAttachmentId: string) =>
    handleOnOpenConfirmation({
      actionTitle: translate('modal.attachment.title'),
      description: translate('modal.attachment.description', {
        name: noteAttachmentId
      }),
      onSuccess: () => handleOnDeleteAttachmentSuccess(noteId),
      title: translate('modal.attachment.title')
    })

  return {
    handleOnDelete,
    handleOnDeleteAttachment,
    handleOnDeleteAttachmentSuccess,
    handleOnDeleteSuccess
  }
}
