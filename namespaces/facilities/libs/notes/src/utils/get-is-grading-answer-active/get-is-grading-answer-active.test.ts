import {
  NoteQuestionCommentType,
  NoteQuestionKind
} from '@staff-portal/graphql/staff'

import { getIsGradingAnswerActive } from './get-is-grading-answer-active'

const activeField = 'answers[0].optionId'

const formAnswers = [
  {
    id: 'VjEtTm90ZUFuc3dlci0',
    comment: null,
    questionId: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzM2',
    kind: NoteQuestionKind.RADIO_BUTTONS,
    optionId: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxOTQ5'
  }
]

const gradingWeightAnswers = {
  nodes: {
    VjEtTm90ZVF1ZXN0aW9uLTMxMzM2: {
      additionalCommentsHint: 'Add comment',
      commentType: NoteQuestionCommentType.SHORT,
      gradingWeight: 2,
      group: {
        label: 'Soft skills - new'
      },
      hint: '',
      id: 'VjEtTm90ZVF1ZXN0aW9uLTMxMzM2',
      kind: NoteQuestionKind.RADIO_BUTTONS,
      label: 'Professionalism and integrity',
      required: true,
      activeOptions: {
        nodes: [
          {
            id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxOTQ2',
            label:
              'Talent describes/demonstrates counter-productive behaviours that have negative outcomes or consequences (make the situation worse).',
            value: '1'
          }
        ]
      }
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
  gradingWeightTotal: 20
}

describe('getIsGradingAnswerActive', () => {
  describe('when params are invalid', () => {
    it.each([
      { activeField: undefined, formAnswers, gradingWeightAnswers },
      { activeField: 'comments', formAnswers, gradingWeightAnswers },
      {
        activeField: activeField,
        formAnswers: undefined,
        gradingWeightAnswers
      },
      {
        activeField: activeField,
        formAnswers,
        gradingWeightAnswers: undefined
      },
      {
        activeField: 'answers[99]',
        formAnswers,
        gradingWeightAnswers: undefined
      },
      {
        activeField: activeField,
        formAnswers,
        gradingWeightAnswers: { ...gradingWeightAnswers, nodes: {} }
      }
    ])('returns null', args => {
      const result = getIsGradingAnswerActive({
        activeField: args.activeField,
        formAnswers: args.formAnswers,
        gradingWeightAnswers: args.gradingWeightAnswers
      })

      expect(result).toBe(false)
    })
  })

  describe('when params are valid', () => {
    it("checks if the form's active field is a grading answer", () => {
      const result = getIsGradingAnswerActive({
        activeField,
        formAnswers,
        gradingWeightAnswers
      })

      expect(result).toBe(true)
    })
  })
})
