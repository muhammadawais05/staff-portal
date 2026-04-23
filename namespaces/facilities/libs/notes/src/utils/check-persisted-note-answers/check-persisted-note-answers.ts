import { NoteAnswerInputWithKind } from '../../types'

export const checkPersistedNoteAnswers = ({
  persistedAnswers,
  answers
}: {
  persistedAnswers?: NoteAnswerInputWithKind[]
  answers?: NoteAnswerInputWithKind[]
}) => {
  if ((persistedAnswers ?? []).length !== (answers ?? []).length) {
    return false
  }

  let isValid = true

  persistedAnswers?.forEach(({ id, kind, questionId }, index) => {
    const answer = answers?.[index]

    if (
      !answer ||
      id !== answer.id ||
      kind !== answer.kind ||
      questionId !== answer.questionId
    ) {
      isValid = false

      return
    }
  })

  return isValid
}
