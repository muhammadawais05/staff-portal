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
import { useCreateTechnicalTwoCallTalentNote } from './data'
import { Talent } from '../../types'

export interface Props {
  talent: Talent
  verticalId: string
  createTechnicalTwoCallNote?: OperationType
  onComplete: () => void
  formContainer: RefObject<HTMLDivElement>
}

const AddTechnicalTwoCallNoteButton = ({
  talent,
  verticalId,
  createTechnicalTwoCallNote,
  onComplete,
  formContainer
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const talentId = talent.id
  const emitMessage = useMessageEmitter()

  const [createNote] = useCreateTechnicalTwoCallTalentNote({
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
      mutationResult: data?.createTechnicalTwoCallTalentNote,
      rootLevelErrors: errors,
      successNotificationMessage: 'Note has been added.',
      onSuccessAction: () => {
        emitMessage(TALENT_UPDATED, { talentId })
        callback()
        onComplete()
      }
    })
  }

  if (!createTechnicalTwoCallNote) {
    return null
  }

  return (
    <AddCustomNoteButton
      includeSoftSkills
      fetchPolicy='cache-first'
      talent={talent}
      verticalId={verticalId}
      noteType={TalentNoteType.TECHNICAL_TWO_CALL}
      title='Technical Two'
      onSubmit={onSubmit}
      formContainer={formContainer}
      initialOperation={createTechnicalTwoCallNote}
      operationName='createTechnicalTwoCallTalentNote'
      variant='primary'
    >
      Add Technical Two Call Note
    </AddCustomNoteButton>
  )
}

export default AddTechnicalTwoCallNoteButton
