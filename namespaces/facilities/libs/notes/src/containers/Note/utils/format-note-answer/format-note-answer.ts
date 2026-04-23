import { NoteAnswerCommonFragment } from '../../../../data/note-answer-fragment'

export const formatNoteAnswer = ({
  displayText,
  label,
  comment
}: NoteAnswerCommonFragment) => {
  const valueAndLabel = [displayText, label].filter(Boolean)
  const uniqValues = Array.from(new Set(valueAndLabel)).join(' - ')

  return [uniqValues, comment].filter(Boolean).join('. ')
}
