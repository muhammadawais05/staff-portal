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
import { useCreateOnlineTestTalentNote } from './data'
import { Talent } from '../../types'

export interface Props {
  talent: Talent
  verticalId: string
  createOnlineTestNote?: OperationType
  onComplete: () => void
  formContainer: RefObject<HTMLDivElement>
}

const AddOnlineTestNoteButton = ({
  talent,
  verticalId,
  createOnlineTestNote,
  onComplete,
  formContainer
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const talentId = talent.id
  const emitMessage = useMessageEmitter()
  const [createNote] = useCreateOnlineTestTalentNote({
    onError: () => showError('Unable to create note.')
  })

  const handleSubmit = async (
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
      mutationResult: data?.createOnlineTestTalentNote,
      rootLevelErrors: errors,
      successNotificationMessage: 'Note has been added.',
      onSuccessAction: () => {
        emitMessage(TALENT_UPDATED, { talentId })
        callback()
        onComplete()
      }
    })
  }

  if (!createOnlineTestNote) {
    return null
  }

  return (
    <AddCustomNoteButton
      talent={talent}
      verticalId={verticalId}
      noteType={TalentNoteType.ONLINE_TEST}
      title='Online Test'
      onSubmit={handleSubmit}
      formContainer={formContainer}
      initialOperation={createOnlineTestNote}
      operationName='createOnlineTestTalentNote'
      variant='primary'
    >
      Add Online Test Note
    </AddCustomNoteButton>
  )
}

export default AddOnlineTestNoteButton
