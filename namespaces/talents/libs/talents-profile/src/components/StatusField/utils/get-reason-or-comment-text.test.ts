import { SpecializationApplicationRejectionReasonValue } from '@staff-portal/graphql/staff'

import { getReasonOrCommentText } from './get-reason-or-comment-text'

const comment = 'comment'
const other = 'Other'

describe('getReasonOrCommentText', () => {
  it.each([
    [
      {
        reason: SpecializationApplicationRejectionReasonValue.OTHER,
        comment
      },
      'Comment: comment'
    ],
    [
      {
        reason: SpecializationApplicationRejectionReasonValue.OTHER,
        comment: other
      },
      'Reason: Other.'
    ],
    [
      {
        reason: SpecializationApplicationRejectionReasonValue.UNRESPONSIVE,
        comment
      },
      'Reason: Unresponsive.'
    ],
    [
      {
        reason: SpecializationApplicationRejectionReasonValue.SYSTEM,
        comment
      },
      ''
    ],
    [
      {
        reason:
          undefined as unknown as SpecializationApplicationRejectionReasonValue,
        comment
      },
      ''
    ]
  ])('returns expected value for %s', (values, expected) => {
    const result = getReasonOrCommentText(values)

    expect(result).toBe(expected)
  })
})
