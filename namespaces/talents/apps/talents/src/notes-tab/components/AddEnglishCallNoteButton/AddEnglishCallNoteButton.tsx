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
import { useCreateEnglishCallTalentNote } from './data'
import { Talent } from '../../types'

export interface Props {
  talent: Talent
  verticalId: string
  createEnglishCallNote: OperationType
  onComplete: () => void
  formContainer: RefObject<HTMLDivElement>
}

const AddEnglishCallNoteButton = ({
  talent,
  verticalId,
  createEnglishCallNote,
  onComplete,
  formContainer
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const talentId = talent.id
  const [createNote] = useCreateEnglishCallTalentNote({
    onError: () => showError('Unable to create note.')
  })

  const onSubmit = async (
    {
      comment,
      title,
      attachment,
      answers = [],
      softSkillRatings = []
    }: NoteFormResult,
    callback: () => void
  ) => {
    const { data, errors } = await createNote({
      variables: {
        input: {
          talentId,
          comment,
          title,
          attachment,
          answers,
          softSkillRatings
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.createEnglishCallTalentNote,
      rootLevelErrors: errors,
      successNotificationMessage: 'Note has been added.',
      onSuccessAction: () => {
        emitMessage(TALENT_UPDATED, { talentId })
        callback()
        onComplete()
      }
    })
  }

  if (!createEnglishCallNote) {
    return null
  }

  return (
    <AddCustomNoteButton
      includeSoftSkills
      talent={talent}
      verticalId={verticalId}
      title='English Call'
      noteType={TalentNoteType.ENGLISH_CALL}
      onSubmit={onSubmit}
      formContainer={formContainer}
      initialOperation={createEnglishCallNote}
      operationName='createEnglishCallTalentNote'
      variant='primary'
    >
      Add English Call Note
    </AddCustomNoteButton>
  )
}

export default AddEnglishCallNoteButton
