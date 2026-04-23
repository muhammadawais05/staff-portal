import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { TalentCoachingEngagementNote } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NoteCardSkeletonLoader } from '@staff-portal/ui'
import {
  CreateNoteForm,
  NoteFormProps,
  NoteFormResult
} from '@staff-portal/notes'

import {
  useGetCoachingEngagementNoteDefaultAnswers,
  useAddCoachActionsTalentCoachingEngagementNote
} from './data'

export interface CreateCoachingNoteFormProps extends NoteFormProps {
  nodeId: string
}

const CreateCoachingEngagementNoteForm = ({
  nodeId,
  onComplete,
  onClose
}: CreateCoachingNoteFormProps) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const { answers: coachingNoteAnswers, loading } =
    useGetCoachingEngagementNoteDefaultAnswers({
      id: nodeId,
      noteType: TalentCoachingEngagementNote.COACH_ACTIONS
    })

  const [mutate] = useAddCoachActionsTalentCoachingEngagementNote({
    onError: () => {
      showError('Unable to create note.')
    }
  })

  const handleSubmit = async (
    { title, answers = [], comment, attachment }: NoteFormResult,
    onCompleted: () => void
  ) => {
    const { data } = await mutate({
      variables: {
        input: {
          talentCoachingEngagementId: nodeId,
          title,
          answers,
          comment,
          attachment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.addCoachActionsTalentCoachingEngagementNote,
      onSuccessAction: () => onCompleted()
    })
  }

  if (loading) {
    return <NoteCardSkeletonLoader />
  }

  return (
    <CreateNoteForm
      nodeId={nodeId}
      notableTitle='Tracking Note'
      noteType={TalentCoachingEngagementNote.COACH_ACTIONS}
      title='Tracking Note'
      submitText='Save Note'
      answers={coachingNoteAnswers}
      onSubmit={handleSubmit}
      onComplete={onComplete}
      onClose={onClose}
      commentRequired={false}
    />
  )
}

export default CreateCoachingEngagementNoteForm
