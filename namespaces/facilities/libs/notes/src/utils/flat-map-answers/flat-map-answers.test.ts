import { NoteQuestionKind } from '@staff-portal/graphql/staff'

import { NoteAnswerWithOptionsFragment } from '../../data/note-answer-fragment'
import { AnswerGroupedType } from '../../types'
import { flatMapAnswers } from './flat-map-answers'

const DEFAULT_ANSWER: NoteAnswerWithOptionsFragment = {
  id: '',
  questionEdge: {
    node: {
      id: 'id-1',
      required: true,
      label: 'Label',
      kind: NoteQuestionKind.SKILL,
      activeOptions: { nodes: [] },
      group: { label: 'Group Label' }
    }
  }
}

describe('formatAnswers', () => {
  it('returns a list of answers', () => {
    const answers: AnswerGroupedType[] = [
      {
        groupName: 'First Group',
        groupAnswers: [DEFAULT_ANSWER, DEFAULT_ANSWER]
      },
      {
        groupName: 'Second Group',
        groupAnswers: [DEFAULT_ANSWER, DEFAULT_ANSWER, DEFAULT_ANSWER]
      }
    ]

    const result = flatMapAnswers(answers)

    expect(result).toHaveLength(5)
  })

  describe('when answer has `DATE` kind', () => {
    it.each([
      {
        value: ['2022-01-01T16:08:06+03:00'],
        formattedValue: '2022-01-01'
      },
      {
        value: ['2022-01-01'],
        formattedValue: '2022-01-01'
      },
      { value: ['??'], formattedValue: undefined },
      { value: undefined, formattedValue: undefined }
    ])(
      'returns a list of answers with formatted date value for input: `%s`',
      ({ value, formattedValue }) => {
        const DATE_ANSWER: NoteAnswerWithOptionsFragment = {
          id: '',
          questionEdge: {
            node: {
              id: 'id-1',
              required: true,
              label: 'Label',
              kind: NoteQuestionKind.DATE,
              activeOptions: { nodes: [] },
              group: { label: 'Group Label' }
            }
          },
          value
        }

        const answers: AnswerGroupedType[] = [
          {
            groupName: 'First Group',
            groupAnswers: [DATE_ANSWER]
          }
        ]

        const result = flatMapAnswers(answers)

        expect(result).toEqual([
          {
            id: DATE_ANSWER.id,
            comment: undefined,
            questionId: DATE_ANSWER.questionEdge.node.id,
            kind: DATE_ANSWER.questionEdge.node.kind,
            value: formattedValue,
            optionId: undefined
          }
        ])
      }
    )
  })

  describe('when answer has `RADIO_BUTTON` or `RADIO_BUTTONS_WITH_SKILL` kind', () => {
    it('returns a list of answers with value and option id', () => {
      const RADIO_BUTTON_ANSWER: NoteAnswerWithOptionsFragment = {
        id: 'answer-id-1',
        questionEdge: {
          node: {
            id: 'question-id-1',
            required: true,
            label: 'Label',
            kind: NoteQuestionKind.RADIO_BUTTONS,
            activeOptions: { nodes: [] },
            group: { label: 'Group Label' }
          }
        },
        value: ['Yes'],
        option: {
          id: 'option_id'
        }
      }

      const RADIO_BUTTON_WITH_SKILL_ANSWER: NoteAnswerWithOptionsFragment = {
        ...RADIO_BUTTON_ANSWER,
        id: 'answer-id-2',
        value: ['No'],
        questionEdge: {
          node: {
            ...RADIO_BUTTON_ANSWER.questionEdge.node,
            id: 'question-id-2',
            kind: NoteQuestionKind.RADIO_BUTTONS_WITH_SKILL
          }
        }
      }

      const answers: AnswerGroupedType[] = [
        {
          groupName: 'Radio button group',
          groupAnswers: [RADIO_BUTTON_ANSWER]
        },
        {
          groupName: 'Radio button with skill group',
          groupAnswers: [RADIO_BUTTON_WITH_SKILL_ANSWER]
        }
      ]

      const result = flatMapAnswers(answers)

      expect(result).toEqual([
        {
          id: 'answer-id-1',
          comment: undefined,
          questionId: 'question-id-1',
          kind: NoteQuestionKind.RADIO_BUTTONS,
          value: 'Yes',
          optionId: 'option_id'
        },
        {
          id: 'answer-id-2',
          comment: undefined,
          questionId: 'question-id-2',
          kind: NoteQuestionKind.RADIO_BUTTONS_WITH_SKILL,
          value: 'No',
          optionId: 'option_id'
        }
      ])
    })
  })
})
