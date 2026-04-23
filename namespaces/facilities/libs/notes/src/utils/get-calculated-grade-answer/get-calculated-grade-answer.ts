import { NoteAnswerInputWithKind } from '../../types'
import { GradingWeightAnswers } from '../get-grading-weight-answers'

type Props = {
  formAnswers?: NoteAnswerInputWithKind[]
  gradingWeightAnswers?: GradingWeightAnswers
}

export const getCalculatedGradeAnswer = ({
  formAnswers,
  gradingWeightAnswers
}: Props) => {
  if (!formAnswers || !gradingWeightAnswers) {
    return null
  }

  const answers = formAnswers.reduce<{
    nodes: NoteAnswerInputWithKind[]
    calculatedGradeAnswerIndex: number
  }>(
    (acc, answer, index) => {
      const { nodes, calculatedGradeNode } = gradingWeightAnswers

      if (nodes[answer.questionId]) {
        acc.nodes.push(answer)
      }

      if (answer.questionId === calculatedGradeNode?.id) {
        acc.calculatedGradeAnswerIndex = index
      }

      return acc
    },
    { nodes: [], calculatedGradeAnswerIndex: -1 }
  )

  if (answers.calculatedGradeAnswerIndex === -1) {
    return null
  }

  const answersTotal = answers.nodes.reduce((acc, answer) => {
    const gradingWeightAnswer = gradingWeightAnswers.nodes[answer.questionId]

    const answerValue = Number(answer.value)
    const gradingWeight = Number(gradingWeightAnswer.gradingWeight)
    const partialCalculatedGrade = answerValue * gradingWeight

    return acc + partialCalculatedGrade
  }, 0)

  const calculatedGrade = answersTotal / gradingWeightAnswers.gradingWeightTotal

  return {
    name: `answers[${answers.calculatedGradeAnswerIndex}].value`,
    value: calculatedGrade.toFixed(1)
  }
}
