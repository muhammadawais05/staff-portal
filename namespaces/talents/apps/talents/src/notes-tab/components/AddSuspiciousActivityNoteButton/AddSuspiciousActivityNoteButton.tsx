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
import { useAddTalentSuspiciousActivityReportNote } from './data'
import { Talent } from '../../types'

export interface Props {
  talent: Talent
  addTalentSuspiciousActivityReportNoteOperation?: OperationType
  onComplete: () => void
  formContainer: RefObject<HTMLDivElement>
}

const AddSuspiciousActivityNoteButton = ({
  talent,
  addTalentSuspiciousActivityReportNoteOperation,
  onComplete,
  formContainer
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const talentId = talent.id
  const [createNote] = useAddTalentSuspiciousActivityReportNote({
    onError: () => showError('Unable to create note.')
  })

  const onSubmit = async (
    { comment, title, answers = [] }: NoteFormResult,
    callback: () => void
  ) => {
    const { data, errors } = await createNote({
      variables: {
        input: {
          talentId,
          comment,
          title,
          answers
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.addTalentSuspiciousActivityReportNote,
      rootLevelErrors: errors,
      successNotificationMessage: 'Note has been added.',
      onSuccessAction: () => {
        emitMessage(TALENT_UPDATED, { talentId })
        callback()
        onComplete()
      }
    })
  }

  if (!addTalentSuspiciousActivityReportNoteOperation) {
    return null
  }

  return (
    <AddCustomNoteButton
      talent={talent}
      noteType={TalentNoteType.SUSPICIOUS_ACTIVITY_REPORT}
      title='Suspicious Activity Report'
      onSubmit={onSubmit}
      formContainer={formContainer}
      initialOperation={addTalentSuspiciousActivityReportNoteOperation}
      operationName='addTalentSuspiciousActivityReportNote'
      submitText='Submit Report'
      displayAttachment={false}
      variant='primary'
    >
      Add Suspicious Activity Report
    </AddCustomNoteButton>
  )
}

export default AddSuspiciousActivityNoteButton
