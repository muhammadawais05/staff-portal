import {
  NoteQuestionCommentType,
  NoteQuestionKind
} from '@staff-portal/graphql/staff'

import { NoteAnswerInputWithKind } from '../../types'
import { getCalculatedGradeAnswer } from './get-calculated-grade-answer'

const makeFormAnswers = (firstValue: number, secondValue: number) => {
  const formAnswers: NoteAnswerInputWithKind[] = [
    {
      id: 'VjEtTm90ZUFuc3dlci0',
      comment: null,
      questionId: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzMx',
      kind: NoteQuestionKind.RADIO_BUTTONS,
      value: [firstValue],
      optionId: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxOTIz'
    },
    {
      id: 'VjEtTm90ZUFuc3dlci0',
      comment: null,
      questionId: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzMy',
      kind: NoteQuestionKind.RADIO_BUTTONS,
      value: [secondValue],
      optionId: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxOTI5'
    },
    {
      id: 'VjEtTm90ZUFuc3dlci0',
      comment: null,
      questionId: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzM3',
      kind: NoteQuestionKind.STRING,
      value: null
    }
  ]

  return formAnswers
}

const gradingWeightAnswers = {
  nodes: {
    VjEtTm90ZVF1ZXN0aW9uLTMxMzMx: {
      activeOptions: {
        nodes: [
          {
            id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxOTIx',
            label: 'Talent showed inadequate performance',
            value: '1'
          }
        ]
      },
      additionalCommentsHint: 'Add comment',
      commentType: NoteQuestionCommentType.SHORT,
      gradingWeight: 10,
      group: {
        label: 'Vertical Expertise'
      },
      hint: '',
      id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzMx',
      kind: NoteQuestionKind.RADIO_BUTTONS,
      label: 'Task Execution',
      required: true
    },
    VjEtTm90ZVF1ZXN0aW9uLTMxMzMy: {
      activeOptions: {
        nodes: [
          {
            id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxOTI2',
            label: 'Talent does not have any relevant experience',
            value: '1'
          }
        ]
      },
      additionalCommentsHint: 'Add comment',
      commentType: NoteQuestionCommentType.SHORT,
      gradingWeight: 4,
      group: {
        label: 'Vertical Expertise'
      },
      hint: '',
      id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzMy',
      kind: NoteQuestionKind.RADIO_BUTTONS,
      label: 'Domain / technical experience',
      required: true
    }
  },
  calculatedGradeNode: {
    activeOptions: {
      nodes: []
    },
    additionalCommentsHint: null,
    commentType: null,
    gradingWeight: null,
    group: {
      label: 'Grading'
    },
    hint: '',
    id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzM3',
    kind: NoteQuestionKind.STRING,
    label: 'Calculated Grade',
    required: true
  },
  gradingWeightTotal: 14
}

describe('getCalculatedGradeAnswer', () => {
  describe('when formAnswers and gradingWeightAnswers are invalid', () => {
    it('returns null', () => {
      const result = getCalculatedGradeAnswer({
        formAnswers: makeFormAnswers(3, 4),
        gradingWeightAnswers: {
          ...gradingWeightAnswers,
          calculatedGradeNode: undefined
        }
      })

      expect(result).toBeNull()
    })
  })

  describe('when calculated grade field is not valid', () => {
    it('returns null', () => {
      const result = getCalculatedGradeAnswer({
        formAnswers: [],
        gradingWeightAnswers: undefined
      })

      expect(result).toBeNull()
    })
  })

  describe('when formAnswers and gradingWeightAnswers are valid', () => {
    it.each([
      { answers: makeFormAnswers(3, 4), calculatedGradeValue: '3.3' },
      { answers: makeFormAnswers(1, 3), calculatedGradeValue: '1.6' },
      { answers: makeFormAnswers(2, 5), calculatedGradeValue: '2.9' }
    ])('calculates the grade correctly', args => {
      const result = getCalculatedGradeAnswer({
        formAnswers: args.answers,
        gradingWeightAnswers
      })

      const calculatedGrade = {
        name: 'answers[2].value',
        value: args.calculatedGradeValue
      }

      expect(result).toMatchObject(calculatedGrade)
    })
  })
})
