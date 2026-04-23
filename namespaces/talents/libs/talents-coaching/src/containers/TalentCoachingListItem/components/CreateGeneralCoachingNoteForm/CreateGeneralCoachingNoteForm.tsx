import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import {
  CreateNoteForm,
  NoteFormProps,
  NoteFormResult
} from '@staff-portal/notes'

import { useAddGeneralTalentCoachingEngagementNote } from './data'

export interface CreateCoachingNoteFormProps extends NoteFormProps {
  nodeId: string
}

const CreateGeneralCoachingNoteForm = ({
  nodeId,
  onComplete,
  onClose
}: CreateCoachingNoteFormProps) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [mutate] = useAddGeneralTalentCoachingEngagementNote({
    onError: () => {
      showError('Unable to create note.')
    }
  })

  const handleSubmit = async (
    { title, comment, attachment }: NoteFormResult,
    onCompleted: () => void
  ) => {
    const { data } = await mutate({
      variables: {
        input: {
          talentCoachingEngagementId: nodeId,
          title,
          comment,
          attachment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.addGeneralTalentCoachingEngagementNote,
      onSuccessAction: () => onCompleted()
    })
  }

  return (
    <CreateNoteForm
      nodeId={nodeId}
      notableTitle='Coaching Note'
      submitText='Save Note'
      onSubmit={handleSubmit}
      onComplete={onComplete}
      onClose={onClose}
    />
  )
}

export default CreateGeneralCoachingNoteForm
