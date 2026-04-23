import React from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { TopShieldApplicationNote } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import {
  CreateNoteForm,
  NoteFormProps,
  NoteFormResult
} from '@staff-portal/notes'

import { TopShieldApplicationFragment } from '../../data'
import { useAddTopShieldApplicationInterviewNote } from './data'

interface Props extends NoteFormProps {
  topShieldApplication: TopShieldApplicationFragment
}

const CreateTopShieldApplicationInterviewNoteForm = ({
  topShieldApplication,
  onComplete,
  onClose
}: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [mutate] = useAddTopShieldApplicationInterviewNote({
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
          topShieldApplicationId: topShieldApplication.id,
          title,
          answers,
          comment,
          attachment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.addTopShieldApplicationInterviewNote,
      onSuccessAction: () => onCompleted()
    })
  }

  return (
    <CreateNoteForm
      nodeId={topShieldApplication.id}
      notableTitle='TopShield Application Interview Note'
      noteType={TopShieldApplicationNote.INTERVIEW}
      title='TopShield Application Interview Note'
      submitText='Save Note'
      answers={topShieldApplication.defaultNoteAnswers.nodes}
      onSubmit={handleSubmit}
      onComplete={onComplete}
      onClose={onClose}
      commentRequired={false}
    />
  )
}

export default CreateTopShieldApplicationInterviewNoteForm
