import {
  NoteAnswerWithOptionsFragment,
  NoteQuestionWithOptionsFragment
} from '../../data/note-answer-fragment'

export const calculatedGradeLabel = 'Calculated Grade'

export type GradingWeightAnswers = {
  nodes: {
    [nodeId: string]: NoteQuestionWithOptionsFragment
  }
  calculatedGradeNode?: NoteQuestionWithOptionsFragment
  gradingWeightTotal: number
}

export const getGradingWeightAnswers = (
  answers: NoteAnswerWithOptionsFragment[]
) => {
  return answers.reduce<GradingWeightAnswers>(
    (acc, answer) => {
      const { node } = answer.questionEdge

      if (node.label === calculatedGradeLabel) {
        acc.calculatedGradeNode = node
      } else if (node.gradingWeight) {
        acc.nodes[node.id] = node
        acc.gradingWeightTotal += node.gradingWeight
      }

      return acc
    },
    {
      nodes: {},
      calculatedGradeNode: undefined,
      gradingWeightTotal: 0
    }
  )
}
