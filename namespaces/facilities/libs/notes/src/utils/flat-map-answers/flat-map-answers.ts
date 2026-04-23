import {
  isValid,
  parseISO,
  formatDate,
  DEFAULT_ISO_DATE_FORMAT
} from '@staff-portal/date-time-utils'
import { NoteQuestionKind } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { AnswerGroupedType, NoteAnswerInputWithKind } from '../../types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any,  complexity
const getFormattedValue = (kind: NoteQuestionKind, values?: any[] | null) => {
  if (!values) {
    const isWithMultipleSection =
      kind === NoteQuestionKind.MULTIPLE_SKILLS ||
      kind === NoteQuestionKind.FREELANCE_PLATFORMS

    return isWithMultipleSection ? [] : undefined
  }

  const isEmptyArray = values.every(value => !value)

  switch (kind) {
    case NoteQuestionKind.DATE: {
      const value = !isEmptyArray ? values[0] : null
      const parsedDate = value ? parseISO(value) : undefined

      if (!isValid(parsedDate)) {
        return undefined
      }

      // Force-format to a valid Date string type
      return formatDate(parsedDate, { dateFormat: DEFAULT_ISO_DATE_FORMAT })
    }
    case NoteQuestionKind.RADIO_BUTTONS_WITH_SKILL:
    case NoteQuestionKind.RADIO_BUTTONS:
      return values?.[0]
    case NoteQuestionKind.MULTIPLE_SKILLS: {
      if (isEmptyArray) {
        return []
      }

      return values.map(value => ({
        label: value,
        node: { id: value }
      }))
    }
    case NoteQuestionKind.FREELANCE_PLATFORMS: {
      if (isEmptyArray) {
        return []
      }

      return values.map(value => ({
        text: value,
        value: value
      }))
    }
    case NoteQuestionKind.REFERRER: {
      const value = values[0]
      const encodedId = encodeEntityId(value, 'Role')

      return encodedId
    }
  }

  return values[0]
}

export const flatMapAnswers = (
  answers: AnswerGroupedType[]
): NoteAnswerInputWithKind[] =>
  answers
    .flatMap(({ groupAnswers }) => groupAnswers)
    .flatMap(
      ({
        id,
        comment,
        option,
        value,
        questionEdge: {
          node: { id: questionId, kind }
        }
      }) => ({
        id: id as string,
        comment,
        questionId,
        kind,
        value: getFormattedValue(kind, value),
        optionId: option?.id
      })
    )
