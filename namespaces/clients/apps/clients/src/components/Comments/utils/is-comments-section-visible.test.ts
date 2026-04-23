import { Entry } from '@staff-portal/chronicles'

import type { CommentsInfo } from './is-comments-section-visible'
import { isCommentsSectionVisible } from '.'

const params: CommentsInfo = {
  loadingAccessInfo: false,
  areCommentsAccessible: true,
  loadingComments: false,
  comments: [{}] as Entry[]
}

describe('isCommentsSectionVisible', () => {
  describe.each([
    {
      condition: 'loading',
      options: { loadingAccessInfo: true, loadingComments: true },
      expected: true
    },
    {
      condition: 'loaded and has access and data',
      options: {},
      expected: true
    },
    {
      condition: 'has no access',
      options: { areCommentsAccessible: false },
      expected: false
    },
    {
      condition: 'has no data',
      options: { comments: [] },
      expected: false
    }
  ])('when $condition', ({ options, expected }) => {
    it(`returns ${expected}`, () => {
      const visible = isCommentsSectionVisible({ ...params, ...options })

      expect(visible).toBe(expected)
    })
  })
})
