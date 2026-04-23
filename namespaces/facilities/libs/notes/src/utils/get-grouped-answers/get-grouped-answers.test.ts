import { NoteAnswerFragment } from '../../data/note-answer-fragment'
import { getGroupedAnswers } from './get-grouped-answers'

describe('getGroupedAnswers', () => {
  it('groups the answers based on group label', () => {
    const answers: NoteAnswerFragment[] = [
      {
        id: 'test-id-1',
        questionEdge: {
          node: {
            id: 'id-1',
            label: 'Question Label',
            group: { label: 'Group One' }
          }
        }
      },
      {
        id: 'test-id-2',
        questionEdge: {
          node: {
            id: 'id-2',
            label: 'Question Label',
            group: { label: 'Group One' }
          }
        }
      },
      {
        id: 'test-id-3',
        questionEdge: {
          node: {
            id: 'id-3',
            label: 'Question Label',
            group: { label: 'Group Two' }
          }
        }
      }
    ]
    const result = getGroupedAnswers(answers)

    expect(result).toHaveLength(2)
    expect(result[0].groupAnswers).toHaveLength(2)
    expect(result[1].groupAnswers).toHaveLength(1)
  })
})
