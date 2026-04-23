import { ReactNode, SyntheticEvent } from 'react'
import {
  ClientNoteType,
  NoteAnswerInput,
  NoteQuestionKind,
  NoteQuestionOption,
  SoftSkillRatingInput,
  SoftSkillRatingValue,
  TalentNoteType,
  TalentCoachingEngagementNote,
  TopShieldApplicationNote
} from '@staff-portal/graphql/staff'

import { NoteSoftSkillFragment } from './data/note-soft-skill-fragment'
import { NoteAnswerWithOptionsFragment } from './data/note-answer-fragment'

export type NoteCreator = {
  webResource?: {
    url?: string | null
    text: string
  }
}

export type NoteFormProps = {
  answers?: NoteAnswerWithOptionsFragment[]
  softSkills?: NoteSoftSkillFragment[]
  submitText?: string
  verticalId?: string
  onClose?: (event?: SyntheticEvent<HTMLButtonElement>) => void
  onComplete?: () => void
  children?: ReactNode
}

export type AnswerGroupedType = {
  groupName: string
  groupAnswers: NoteAnswerWithOptionsFragment[]
}

export type NoteFormSoftSkill = {
  [key: string]: unknown
  softSkill: NoteSoftSkillFragment
  value?: SoftSkillRatingValue
  comment: string
}

export type NoteAnswerInputWithKind = NoteAnswerInput & {
  id: string
  kind: NoteQuestionKind
}

export type NoteFormAttachment = { file: File }

export type NoteFormType = {
  [key: string]: unknown
  noteTitle: string
  comment: string
  attachment?: NoteFormAttachment[]
  answers?: NoteAnswerInputWithKind[]
  softSkills?: NoteFormSoftSkill[]
}

export type NoteFormResult = {
  [key: string]: unknown
  title: string
  comment: string
  attachment?: File
  answers?: NoteAnswerInput[]
  softSkillRatings?: SoftSkillRatingInput[]
}

export type NoteFormAnswerBuilderType = {
  index: number
  required?: boolean
  value?: string[]
  placeholder?: string
  options?: NoteQuestionOption[]
  disabled?: boolean
}

export type NoteType =
  | ClientNoteType
  | TalentNoteType
  | TalentCoachingEngagementNote
  | TopShieldApplicationNote
  | 'MATCHING_NOTE'
  | 'default'

export type NoteLinks = {
  [noteStorageKey: string]: {
    notableId: string
    notableTitle: string
    path: string
  }
}
