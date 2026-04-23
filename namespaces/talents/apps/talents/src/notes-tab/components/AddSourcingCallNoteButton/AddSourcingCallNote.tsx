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
import { useCreateSourcingCallTalentNote } from './data'
import { Talent } from '../../types'

export interface Props {
  talent: Talent
  verticalId: string
  createSourcingCallNoteOperation?: OperationType
  onComplete: () => void
  formContainer: RefObject<HTMLDivElement>
}

const AddSourcingCallNoteButton = ({
  talent,
  verticalId,
  createSourcingCallNoteOperation,
  onComplete,
  formContainer
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const talentId = talent.id
  const [createNote] = useCreateSourcingCallTalentNote({
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
      mutationResult: data?.createSourcingCallTalentNote,
      rootLevelErrors: errors,
      successNotificationMessage: 'Note has been added.',
      onSuccessAction: () => {
        emitMessage(TALENT_UPDATED, { talentId })
        callback()
        onComplete()
      }
    })
  }

  if (!createSourcingCallNoteOperation) {
    return null
  }

  return (
    <AddCustomNoteButton
      talent={talent}
      verticalId={verticalId}
      title='Sourcing Intro Call Notes: '
      noteType={TalentNoteType.SOURCING_CALL}
      onSubmit={onSubmit}
      commentPlaceholder='Notes for screeners and matchers, red flags, attitude, personality, past projects details, preferences.'
      formContainer={formContainer}
      initialOperation={createSourcingCallNoteOperation}
      operationName='createSourcingCallTalentNote'
      variant='primary'
    >
      Add Sourcing Call Note
    </AddCustomNoteButton>
  )
}

export default AddSourcingCallNoteButton
