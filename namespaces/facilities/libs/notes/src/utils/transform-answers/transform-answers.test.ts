import { transformAnswers } from './transform-answers'
import { NoteAnswerInputWithKind } from '../../types'

describe('transformAnswers', () => {
  it('does not touch the existed array value', () => {
    const answers = [
      {
        id: 'VjEtTm90ZUFuc3dlci0',
        comment: null,
        questionId: 'VjEtTm90ZVF1ZXN0aW9uLTMwMDUw',
        kind: 'MULTIPLE_SKILLS',
        value: [
          {
            value: 'Spark SQL',
            text: 'Spark SQL',
            __typename: 'AutocompleteEdge',
            key: 'skills-keywords-97064',
            label: 'Spark SQL',
            labelHighlight:
              '{{strong}}S{{/strong}}park {{strong}}S{{/strong}}QL',
            node: {
              __typename: 'Skill',
              id: 'VjEtU2tpbGwtOTcwNjQ'
            }
          }
        ]
      }
    ] as NoteAnswerInputWithKind[]

    expect(transformAnswers(answers)?.[0].value).toHaveLength(1)
  })

  it('sets up a null value to a blank array', () => {
    const answers = [
      {
        id: 'VjEtTm90ZUFuc3dlci0',
        comment: null,
        questionId: 'VjEtTm90ZVF1ZXN0aW9uLTMwMDUw',
        kind: 'MULTIPLE_SKILLS',
        value: null
      }
    ] as NoteAnswerInputWithKind[]

    expect(transformAnswers(answers)?.[0].value).toHaveLength(0)
  })
})
