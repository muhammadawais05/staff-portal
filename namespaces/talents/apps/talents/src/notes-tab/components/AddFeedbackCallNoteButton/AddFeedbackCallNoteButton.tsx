import { useNotifications } from '@toptal/picasso/utils'
import React, { RefObject } from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import {
  Operation as OperationType,
  TalentNoteType
} from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NoteFormResult } from '@staff-portal/notes'

import AddCustomNoteButton from '../AddCustomNoteButton'
import { useCreateFeedbackCallTalentNote } from './data'
import { Talent } from '../../types'

export interface Props {
  talent: Talent
  createFeedbackCallNoteOperation?: OperationType
  onComplete: () => void
  formContainer: RefObject<HTMLDivElement>
}

const AddFeedbackCallNoteButton = ({
  talent,
  createFeedbackCallNoteOperation,
  onComplete,
  formContainer
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const talentId = talent.id
  const [createNote] = useCreateFeedbackCallTalentNote({
    onError: () => showError('Unable to create note.')
  })

  const onSubmit = async (
    { comment, title, attachment, answers = [] }: NoteFormResult,
    callback: () => void
  ) => {
    const { data, errors } = await createNote({
      variables: {
        input: {
          talentId,
          comment,
          title,
          attachment,
          answers
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.createFeedbackCallTalentNote,
      rootLevelErrors: errors,
      successNotificationMessage: 'Note has been added.',
      onSuccessAction: () => {
        emitMessage(TALENT_UPDATED, { talentId })
        callback()
        onComplete()
      }
    })
  }

  if (!createFeedbackCallNoteOperation) {
    return null
  }

  return (
    <AddCustomNoteButton
      talent={talent}
      noteType={TalentNoteType.FEEDBACK_CALL}
      title='Feedback Call'
      onSubmit={onSubmit}
      formContainer={formContainer}
      initialOperation={createFeedbackCallNoteOperation}
      operationName='createFeedbackCallTalentNote'
      variant='primary'
    >
      Add Feedback Call Note
    </AddCustomNoteButton>
  )
}

export default AddFeedbackCallNoteButton
