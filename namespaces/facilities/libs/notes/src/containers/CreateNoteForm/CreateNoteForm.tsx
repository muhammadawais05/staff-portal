import { usePersistentFormContext } from '@staff-portal/forms'
import { SoftSkillRatingValue } from '@staff-portal/graphql/staff'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useActionLoading } from '@staff-portal/utils'
import { Button, Container } from '@toptal/picasso'
import { arrayMutators, Form } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import React, { FC, ReactNode, useEffect, useState } from 'react'

import useNoteNotifications from '../../hooks/use-note-notifications'
import {
  NoteFormProps,
  NoteFormResult,
  NoteFormType,
  NoteType
} from '../../types'
import {
  flatMapAnswers,
  formatAnswers,
  formatSoftSkillRatings,
  getPersistStorageKey,
  validateAndFormatPersistedNote,
  getGroupedAnswers,
  getGradingWeightAnswers
} from '../../utils'
import Note from '../Note'
import NoteFormFields from '../NoteFormFields'
import { useCreateNote } from './data'

export interface FormWrapperProps {
  [key: string]: unknown
}

export interface CreateNoteFormProps extends NoteFormProps {
  commentRequired?: boolean
  nodeId: string
  notableTitle: string
  title?: string
  onSubmit?: (note: NoteFormResult, onCompleted: () => void) => void
  hideCommentField?: boolean
  commentPlaceholder?: string
  noteType?: NoteType
  defaultValues?: { [key: string]: unknown }
  formWrapper?: FC<FormWrapperProps>
  formWrapperOptions?: { [key: string]: unknown }
  headerContent?: ReactNode
  hideTitle?: boolean
  hideIndex?: boolean
  displayHowDidYouHearNote?: boolean
  displayAttachment?: boolean
}

const CreateNoteForm = ({
  hideCommentField,
  commentRequired,
  nodeId: notableId,
  notableTitle,
  answers,
  softSkills,
  submitText = 'Add Note',
  title = '',
  children,
  verticalId,
  onClose,
  onComplete,
  onSubmit,
  commentPlaceholder,
  defaultValues,
  noteType = 'default',
  formWrapper,
  formWrapperOptions,
  headerContent,
  hideTitle = false,
  hideIndex = false,
  displayHowDidYouHearNote,
  displayAttachment
}: CreateNoteFormProps) => {
  useActionLoading('note-form', true)
  const persistStorageKey = getPersistStorageKey(notableId)

  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const { untrackNote } = useNoteNotifications()
  const { getForm, removeForm, clearFormType } = usePersistentFormContext()
  const [initialValues, setInitialValues] = useState<NoteFormType | undefined>()

  const handleComplete = () => {
    untrackNote(persistStorageKey)
    removeForm({
      nodeId: notableId,
      formName: noteType,
      localStorageKey: persistStorageKey
    })
    onComplete?.()
  }

  const [createNote, { loading }] = useCreateNote({
    onError: () => showError('Unable to create note.')
  })

  const groupedAnswers = getGroupedAnswers(answers || [])
  const gradingWeightAnswers = getGradingWeightAnswers(answers || [])

  useEffect(() => {
    if (!initialValues) {
      const formAnswers = flatMapAnswers(groupedAnswers)
      let persistedForm = getForm<NoteFormType>({
        nodeId: notableId,
        formName: noteType,
        localStorageKey: persistStorageKey
      })

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
        comment: '',
        // should not use `title` name to fix autocomplete issue https://toptal-core.atlassian.net/browse/SPT-2113
        noteTitle: title,
        answers: formAnswers,
        softSkills:
          softSkills &&
          softSkills.map(softSkill => ({
            softSkill,
            value: SoftSkillRatingValue.RATING_1,
            comment: ''
          })),
        ...defaultValues
      })
    }
  }, [
    defaultValues,
    getForm,
    groupedAnswers,
    initialValues,
    notableId,
    noteType,
    persistStorageKey,
    softSkills,
    title
  ])

  const handleSubmit = async ({
    comment,
    noteTitle,
    attachment,
    answers: noteAnswers,
    softSkills: noteSoftSkills,
    ...restOptions
  }: NoteFormType) => {
    if (onSubmit) {
      return onSubmit(
        {
          comment,
          title: noteTitle,
          attachment: attachment?.[0]?.file,
          answers: noteAnswers && formatAnswers(noteAnswers),
          softSkillRatings:
            noteSoftSkills && formatSoftSkillRatings(noteSoftSkills),
          ...restOptions
        },
        handleComplete
      )
    }

    const { data, errors } = await createNote({
      variables: {
        input: {
          notableId,
          comment,
          title: noteTitle,
          attachment: attachment?.[0]?.file
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.createNote,
      rootLevelErrors: errors,
      successNotificationMessage: 'Note has been added.',
      onSuccessAction: handleComplete
    })
  }

  const handleClose = () => {
    clearFormType(persistStorageKey)
    onClose?.()
  }

  const handleCancel = () => {
    untrackNote(persistStorageKey)
    handleClose()
  }

  const FormWrapper = formWrapper ?? Container

  return (
    <Container bottom='medium'>
      <Note editMode bottom='medium'>
        <Form<NoteFormType>
          initialValues={initialValues}
          mutators={{ ...arrayMutators }}
          onSubmit={handleSubmit}
        >
          <FormWrapper {...formWrapperOptions}>
            <NoteFormFields
              hideCommentField={hideCommentField}
              commentRequired={commentRequired}
              hideTitle={hideTitle}
              hideIndex={hideIndex}
              answersCount={answers?.length}
              groupedAnswers={groupedAnswers}
              gradingWeightAnswers={gradingWeightAnswers}
              softSkills={softSkills}
              verticalId={verticalId}
              commentPlaceholder={commentPlaceholder}
              noteType={noteType}
              notableId={notableId}
              notableTitle={notableTitle}
              persistStorageKey={persistStorageKey}
              headerContent={headerContent}
              displayAttachment={displayAttachment}
              displayHowDidYouHearNote={displayHowDidYouHearNote}
            >
              {children}
            </NoteFormFields>
          </FormWrapper>

          <Container flex justifyContent='flex-end' top='medium'>
            <Button
              variant='secondary'
              disabled={loading}
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Form.SubmitButton
              variant='positive'
              data-testid='submit-note-button'
              data-pendoid='submit-note-button'
            >
              {submitText}
            </Form.SubmitButton>
          </Container>
        </Form>
      </Note>
    </Container>
  )
}

export default CreateNoteForm
