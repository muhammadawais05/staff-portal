import {
  NoteQuestionCommentType,
  NoteQuestionKind
} from '@staff-portal/graphql/staff'

import { NoteAnswerWithOptionsFragment } from '../../data/note-answer-fragment'
import { getGradingWeightAnswers } from './get-grading-weight-answers'

describe('getGradingWeightAnswers', () => {
  it('groups the grading weight answers and its dependencies', () => {
    const answers: NoteAnswerWithOptionsFragment[] = [
      {
        comment: null,
        displayText: '1',
        id: 'VjEtTm90ZUFuc3dlci0',
        label: 'Talent showed inadequate performance',
        option: {
          id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxOTIx'
        },
        questionEdge: {
          node: {
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
          renderedLabel: 'Task Execution'
        },
        value: ['1']
      },
      {
        comment: null,
        displayText: '1',
        id: 'VjEtTm90ZUFuc3dlci0',
        label: 'Talent does not have any relevant experience',
        option: {
          id: 'VjEtTm90ZVF1ZXN0aW9uT3B0aW9uLTMxOTI2'
        },
        questionEdge: {
          node: {
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
          },
          renderedLabel: 'Domain / technical experience'
        },
        value: ['1']
      },
      {
        comment: null,
        displayText: null,
        id: 'VjEtTm90ZUFuc3dlci0',
        label: null,
        option: null,
        questionEdge: {
          node: {
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
          renderedLabel: 'Calculated Grade'
        },
        value: null
      }
    ]

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

    const result = getGradingWeightAnswers(answers)

    expect(result).toMatchObject(gradingWeightAnswers)
  })
})
