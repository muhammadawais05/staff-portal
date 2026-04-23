import { NoteAnswerInputWithKind } from '../../types'
import { GradingWeightAnswers } from '../get-grading-weight-answers'

type Props = {
  activeField?: string
  formAnswers?: NoteAnswerInputWithKind[]
  gradingWeightAnswers?: GradingWeightAnswers
}

export const getIsGradingAnswerActive = ({
  activeField,
  formAnswers,
  gradingWeightAnswers
}: Props) => {
  const isAnswer = activeField?.includes('answers')

  if (!activeField || !formAnswers || !gradingWeightAnswers || !isAnswer) {
    return false
  }

  const activeFieldIndex = Number(activeField.replace(/\D+/g, ''))
  const selectedAnswer = formAnswers[activeFieldIndex]

  if (!selectedAnswer) {
    return false
  }

  const hasGradingAnswer =
    !!gradingWeightAnswers.nodes[selectedAnswer.questionId]

  return hasGradingAnswer
}
