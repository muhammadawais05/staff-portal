import React, { ReactNode, useEffect, useState } from 'react'
import { useForm } from '@toptal/picasso-forms'
import { usePersistentForm } from '@staff-portal/forms'
import { Container } from '@toptal/picasso'

import { NoteSoftSkillFragment } from '../../data/note-soft-skill-fragment'
import { NoteAttachmentFragment } from '../../data/note-attachment-fragment'
import HowDidYouHearNoteForm from './components/HowDidYouHearNoteForm'
import useNoteNotifications from '../../hooks/use-note-notifications'
import { AnswerGroupedType, NoteFormType, NoteType } from '../../types'
import NoteFormAnswerGroups from './components/NoteFormAnswerGroups'
import NoteFormAttachment from './components/NoteFormAttachment'
import NoteFormComment from './components/NoteFormComment'
import NoteFormSoftSkills from './components/NoteFormSoftSkills'
import NoteFormTitle from './components/NoteFormTitle'
import NoteFormGroupHeader from './components/NoteFormGroupHeader'
import { GradingWeightAnswers } from '../../utils'
import { useChangeCalculatedGrade } from '../../hooks/use-change-calculated-grade'

interface NoteFormFieldsProps {
  attachment?: NoteAttachmentFragment
  answersCount?: number
  hideCommentField?: boolean
  commentRequired?: boolean
  groupedAnswers?: AnswerGroupedType[]
  gradingWeightAnswers?: GradingWeightAnswers
  softSkills?: NoteSoftSkillFragment[]
  verticalId?: string
  commentPlaceholder?: string
  persistStorageKey?: string
  noteType?: NoteType
  notableId: string
  notableTitle?: string
  headerContent?: ReactNode
  hideTitle?: boolean
  hideIndex?: boolean
  isEditingExisting?: boolean
  displayHowDidYouHearNote?: boolean
  displayAttachment?: boolean
  children?: ReactNode
}

const NoteFormFields = ({
  attachment,
  answersCount,
  softSkills,
  children,
  hideCommentField = false,
  commentRequired,
  verticalId,
  groupedAnswers = [],
  gradingWeightAnswers,
  commentPlaceholder,
  persistStorageKey = '',
  noteType = 'default',
  notableTitle = '',
  notableId,
  headerContent,
  hideTitle = false,
  hideIndex = false,
  isEditingExisting,
  displayHowDidYouHearNote,
  displayAttachment = true
}: NoteFormFieldsProps) => {
  const [isTouched, setTouched] = useState(false)
  const { trackNote } = useNoteNotifications()

  const { subscribe, getState, change } = useForm<NoteFormType>()

  useEffect(() => {
    if (!isTouched && persistStorageKey && notableTitle) {
      return subscribe(
        ({ pristine }) => {
          if (pristine) {
            return
          }

          setTouched(true)

          trackNote(persistStorageKey, {
            notableTitle,
            notableId
          })
        },
        { pristine: true }
      )
    }
  }, [
    isTouched,
    persistStorageKey,
    notableId,
    notableTitle,
    subscribe,
    trackNote,
    noteType
  ])

  usePersistentForm<NoteFormType>({
    nodeId: notableId,
    formName: noteType,
    localStorageKey: persistStorageKey
  })

  const formState = getState()

  useChangeCalculatedGrade({
    formState,
    gradingWeightAnswers,
    change
  })

  return (
    <>
      {!hideTitle && <NoteFormTitle />}

      {headerContent}

      {Boolean(groupedAnswers.length) && (
        <NoteFormAnswerGroups
          hideIndex={hideIndex}
          groupedAnswers={groupedAnswers}
          verticalId={verticalId}
          isEditingExisting={isEditingExisting}
        />
      )}

      {Boolean(softSkills?.length) && (
        <NoteFormSoftSkills startCounter={answersCount} />
      )}

      {!hideCommentField && (
        <NoteFormComment
          placeholder={commentPlaceholder}
          required={commentRequired}
        />
      )}

      {children}

      {displayHowDidYouHearNote ? (
        <Container top='medium' bottom='medium'>
          <NoteFormGroupHeader title='Additional Details' />
          <HowDidYouHearNoteForm />
          {displayAttachment && <NoteFormAttachment attachment={attachment} />}
        </Container>
      ) : (
        <>
          {displayAttachment && <NoteFormAttachment attachment={attachment} />}
        </>
      )}
    </>
  )
}

export default NoteFormFields
