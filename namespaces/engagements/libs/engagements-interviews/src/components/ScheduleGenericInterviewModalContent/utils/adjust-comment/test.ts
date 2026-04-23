import { InterviewCommunicationType } from '@staff-portal/graphql/staff'

import { adjustComment, ZOOM_PLACEHOLDER } from './adjust-comment'

describe('adjustComment', () => {
  it.each([
    {
      comment: undefined,
      communication: InterviewCommunicationType.PHONE,
      result: ''
    },
    {
      comment: '',
      communication: InterviewCommunicationType.PHONE,
      result: ''
    },
    {
      comment: 'foo',
      communication: InterviewCommunicationType.PHONE,
      result: 'foo'
    },
    {
      comment: '',
      communication: InterviewCommunicationType.CUSTOM_WEB_CONFERENCE,
      result: ZOOM_PLACEHOLDER
    },
    {
      comment: 'foo',
      communication: InterviewCommunicationType.CUSTOM_WEB_CONFERENCE,
      result: `foo\n${ZOOM_PLACEHOLDER}`
    },
    {
      comment: `${ZOOM_PLACEHOLDER}\nfoo`,
      communication: InterviewCommunicationType.CUSTOM_WEB_CONFERENCE,
      result: `${ZOOM_PLACEHOLDER}\nfoo`
    }
  ])('returns valid comment', ({ comment, communication, result }) => {
    const data = adjustComment({
      comment,
      communication
    })

    expect(data).toBe(result)
  })
})
