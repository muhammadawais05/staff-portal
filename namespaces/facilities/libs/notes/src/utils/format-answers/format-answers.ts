import {
  NoteAnswerInput,
  NoteAnswerUpdateInput
} from '@staff-portal/graphql/staff'

import { NoteAnswerInputWithKind } from '../../types'
import { formatValue } from '../format-value'

export const formatAnswers = (
  answers: NoteAnswerInputWithKind[]
): NoteAnswerInput[] =>
  answers.map(({ kind, questionId, comment, optionId, value }) => ({
    questionId,
    comment,
    optionId,
    value: formatValue(kind, value)
  }))

export const formatAnswersWithId = (
  answers: NoteAnswerInputWithKind[]
): NoteAnswerUpdateInput[] =>
  answers.map(({ id, kind, questionId, comment = '', optionId, value }) => ({
    id,
    questionId,
    comment,
    optionId,
    value: formatValue(kind, value)
  }))
