import { Container, Typography } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import React, { RefObject } from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { Link } from '@staff-portal/navigation'
import {
  Operation as OperationType,
  TalentNoteType
} from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'
import { NoteFormResult } from '@staff-portal/notes'

import AddCustomNoteButton from '../AddCustomNoteButton'
import { useCreatePrescreeningTalentNote } from './data'
import { Talent } from '../../types'

export interface Props {
  talent: Talent
  prescreeningRecordingUrl?: string
  createPrescreeningNoteOperation?: OperationType
  onComplete: () => void
  formContainer: RefObject<HTMLDivElement>
}

const AddPrescreeningNoteButton = ({
  talent,
  prescreeningRecordingUrl,
  createPrescreeningNoteOperation,
  onComplete,
  formContainer
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const talentId = talent.id
  const [createNote] = useCreatePrescreeningTalentNote({
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
      mutationResult: data?.createPrescreeningTalentNote,
      rootLevelErrors: errors,
      successNotificationMessage: 'Note has been added.',
      onSuccessAction: () => {
        emitMessage(TALENT_UPDATED, { talentId })
        callback()
        onComplete()
      }
    })
  }

  if (!createPrescreeningNoteOperation) {
    return null
  }

  const content = prescreeningRecordingUrl ? (
    <Container top='small' bottom='small'>
      <Typography size='medium' weight='semibold'>
        Prescreening recording:{' '}
        <Link target='_blank' href={prescreeningRecordingUrl}>
          Play recording in a new tab
        </Link>
      </Typography>
    </Container>
  ) : null

  return (
    <AddCustomNoteButton
      talent={talent}
      title='Prescreening'
      noteType={TalentNoteType.PRESCREENING}
      headerContent={content}
      onSubmit={onSubmit}
      formContainer={formContainer}
      initialOperation={createPrescreeningNoteOperation}
      operationName='createPrescreeningTalentNote'
      variant='primary'
    >
      Add Prescreening Note
    </AddCustomNoteButton>
  )
}

export default AddPrescreeningNoteButton
