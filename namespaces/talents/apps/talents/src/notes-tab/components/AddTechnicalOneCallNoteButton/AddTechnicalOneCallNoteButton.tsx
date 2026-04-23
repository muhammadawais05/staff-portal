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
import { useCreateTechnicalOneCallTalentNote } from './data'
import { Talent } from '../../types'

export interface Props {
  talent: Talent
  verticalId: string
  createTechnicalOneCallNote?: OperationType
  onComplete: () => void
  formContainer: RefObject<HTMLDivElement>
}

const AddTechnicalOneCallNoteButton = ({
  talent,
  verticalId,
  createTechnicalOneCallNote,
  onComplete,
  formContainer
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const talentId = talent.id
  const emitMessage = useMessageEmitter()
  const [createNote] = useCreateTechnicalOneCallTalentNote({
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
      mutationResult: data?.createTechnicalOneCallTalentNote,
      rootLevelErrors: errors,
      successNotificationMessage: 'Note has been added.',
      onSuccessAction: () => {
        emitMessage(TALENT_UPDATED, { talentId })
        callback()
        onComplete()
      }
    })
  }

  if (!createTechnicalOneCallNote) {
    return null
  }

  return (
    <AddCustomNoteButton
      includeSoftSkills
      fetchPolicy='cache-first'
      talent={talent}
      verticalId={verticalId}
      noteType={TalentNoteType.TECHNICAL_ONE_CALL}
      title='Technical One'
      onSubmit={onSubmit}
      formContainer={formContainer}
      initialOperation={createTechnicalOneCallNote}
      operationName='createTechnicalOneCallTalentNote'
      variant='primary'
    >
      Add Technical One Call Note
    </AddCustomNoteButton>
  )
}

export default AddTechnicalOneCallNoteButton
