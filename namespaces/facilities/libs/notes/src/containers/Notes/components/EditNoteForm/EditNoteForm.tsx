import { usePersistentFormContext } from '@staff-portal/forms'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { EditItemAction } from '@staff-portal/ui'
import { Button, Container } from '@toptal/picasso'
import { arrayMutators, Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import React, { SyntheticEvent, useEffect, useState } from 'react'

import { NoteWithOptionFragment } from '../../../../data/note-fragment'
import { NoteFormProps, NoteFormType } from '../../../../types'
import {
  flatMapAnswers,
  formatAnswersWithId,
  formatSoftSkillRatingsWithId,
  getGradingWeightAnswers,
  getGroupedAnswers,
  validateAndFormatPersistedNote
} from '../../../../utils'
import NoteFormFields from '../../../NoteFormFields'
import { useUpdateNote } from './data'

export interface EditNoteFormProps extends NoteFormProps {
  commentRequired?: boolean
  note: NoteWithOptionFragment
}

const EditNoteForm = ({
  commentRequired,
  note,
  verticalId,
  children,
  onClose,
  onComplete,
  submitText = 'Save Note'
}: EditNoteFormProps) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const { getForm } = usePersistentFormContext()
  const [initialValues, setInitialValues] = useState<NoteFormType | undefined>()

  const [editNote, { loading: updateNoteLoading }] = useUpdateNote({
    onCompleted: onComplete,
    onError: () => showError('Unable to edit note.')
  })

  const {
    id: noteId,
    title,
    comment,
    attachment,
    answers: { nodes: answers },
    softSkillRatings: { nodes: softSkillRatings }
  } = note

  const softSkills = softSkillRatings.map(({ softSkill }) => softSkill)
  const groupedAnswers = getGroupedAnswers(answers as [])
  const gradingWeightAnswers = getGradingWeightAnswers(answers as [])

  useEffect(() => {
    if (!initialValues) {
      const formAnswers = flatMapAnswers(groupedAnswers)
      let persistedForm = getForm<NoteFormType>({ nodeId: note.id })

      persistedForm = validateAndFormatPersistedNote({
        persistedNote: persistedForm,
        answers: formAnswers,
        softSkills
      })

      if (persistedForm) {
        setInitialValues(persistedForm)

        return
      }

      setInitialValues({
        comment: comment ?? '',
        // should not use `title` name to fix autocomplete issue https://toptal-core.atlassian.net/browse/SPT-2113
        noteTitle: title,
        answers: formAnswers,
        softSkills: softSkillRatings.map(
          ({ id, softSkill, value, comment: softSkillComment }) => ({
            id,
            softSkill: softSkill,
            value: value,
            comment: softSkillComment
          })
        )
      })
    }
  }, [
    comment,
    getForm,
    groupedAnswers,
    initialValues,
    note.id,
    softSkillRatings,
    softSkills,
    title
  ])

  const handleSubmit = async ({
    answers: noteAnswers,
    softSkills: noteSoftSkills,
    noteTitle,
    attachment: files,
    ...value
  }: NoteFormType) => {
    const { data, errors } = await editNote({
      variables: {
        input: {
          noteId,
          ...value,
          comment: value.comment ?? '',
          title: noteTitle,
          attachment: files?.[0]?.file,
          answers: noteAnswers && formatAnswersWithId(noteAnswers),
          softSkillRatings:
            noteSoftSkills && formatSoftSkillRatingsWithId(noteSoftSkills)
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateNote,
      rootLevelErrors: errors,
      onSuccessAction: () =>
        onClose?.({
          currentTarget: {
            dataset: { id: note.id, action: EditItemAction.Close }
          }
        } as unknown as SyntheticEvent<HTMLButtonElement>)
    })
  }

  return (
    <Form<NoteFormType>
      initialValues={initialValues}
      mutators={{ ...arrayMutators }}
      onSubmit={handleSubmit}
    >
      <NoteFormFields
        attachment={attachment ?? undefined}
        answersCount={answers?.length}
        commentRequired={commentRequired}
        groupedAnswers={groupedAnswers}
        gradingWeightAnswers={gradingWeightAnswers}
        softSkills={softSkills}
        verticalId={verticalId}
        notableId={noteId}
        isEditingExisting
      >
        {children}
      </NoteFormFields>

      <Container flex justifyContent='flex-end' top='medium'>
        <Button
          variant='secondary'
          disabled={updateNoteLoading}
          onClick={onClose}
          data-id={note.id}
          data-action={EditItemAction.Close}
        >
          Cancel
        </Button>
        <Form.SubmitButton variant='positive'>{submitText}</Form.SubmitButton>
      </Container>
    </Form>
  )
}

export default EditNoteForm
