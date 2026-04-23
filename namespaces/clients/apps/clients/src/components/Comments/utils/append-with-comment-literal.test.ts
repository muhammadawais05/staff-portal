import { appendWithCommentLiteral } from './append-with-comment-literal'

describe('appendWithCommentLiteral', () => {
  const performedAction = {
    id: 'id',
    occurredAt: 'occurredAt',
    action: 'action',
    subjectGID: 'subjectGID',
    subjectName: 'subjectName',
    performerGID: 'performerGID',
    payload: 'payload',
    template: 'template',
    comment: null
  }

  describe('when entry does not have a comment', () => {
    it('literals are not changed', () => {
      const entries = [
        {
          performedAction,
          literals: ['literals']
        }
      ]

      expect(appendWithCommentLiteral(entries)).toEqual(entries)
    })
  })

  describe('when entry has a comment', () => {
    it('` with comment:` is appended to literals', () => {
      const literals = ['literals']
      const performedActionWithComment = {
        ...performedAction,
        comment: 'test'
      }
      const entries = [
        {
          performedAction: performedActionWithComment,
          literals
        }
      ]

      expect(appendWithCommentLiteral(entries)).toEqual([
        {
          performedAction: performedActionWithComment,
          literals: [...literals, ' with comment:']
        }
      ])
    })
  })
})
