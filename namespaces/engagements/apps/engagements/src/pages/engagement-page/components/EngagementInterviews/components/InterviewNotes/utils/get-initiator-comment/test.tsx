import {
  InterviewCommunicationType,
  InterviewCumulativeStatus,
  InterviewInitiator,
  InterviewKind
} from '@staff-portal/graphql/staff'

import {
  getInitiatorComment,
  InitiatorCommentData
} from './get-initiator-comment'

const interviews: {
  interview: InitiatorCommentData
  comment: string | null
}[] = [
  {
    interview: {
      cumulativeStatus: InterviewCumulativeStatus.SCHEDULED,
      kind: InterviewKind.EXTERNAL
    },
    comment: null
  },
  {
    interview: {
      cumulativeStatus: InterviewCumulativeStatus.TIME_REJECTED,
      initiator: InterviewInitiator.CANDIDATE,
      kind: InterviewKind.EXTERNAL
    },
    comment: null
  },
  {
    interview: {
      cumulativeStatus: InterviewCumulativeStatus.REJECTED,
      initiator: InterviewInitiator.CANDIDATE,
      kind: InterviewKind.EXTERNAL
    },
    comment: null
  },
  {
    interview: {
      cumulativeStatus: InterviewCumulativeStatus.SCHEDULED,
      initiator: InterviewInitiator.CANDIDATE,
      kind: InterviewKind.EXTERNAL
    },
    comment: 'The candidate will initiate the interview.'
  },
  {
    interview: {
      cumulativeStatus: InterviewCumulativeStatus.SCHEDULED,
      communication: InterviewCommunicationType.PHONE,
      initiator: InterviewInitiator.CANDIDATE,
      kind: InterviewKind.EXTERNAL
    },
    comment: 'The candidate will initiate the interview by phone.'
  },
  {
    interview: {
      cumulativeStatus: InterviewCumulativeStatus.SCHEDULED,
      communication: InterviewCommunicationType.CUSTOM_WEB_CONFERENCE,
      initiator: InterviewInitiator.INTERVIEWER,
      kind: InterviewKind.EXTERNAL
    },
    comment: 'The company will initiate the interview by web conference.'
  },
  {
    interview: {
      cumulativeStatus: InterviewCumulativeStatus.SCHEDULED,
      communication: InterviewCommunicationType.SKYPE,
      initiator: InterviewInitiator.INTERVIEWER,
      kind: InterviewKind.INTERNAL
    },
    comment: 'You will initiate the interview by Skype.'
  },
  {
    interview: {
      cumulativeStatus: InterviewCumulativeStatus.SCHEDULED,
      communication: InterviewCommunicationType.SKYPE,
      initiator: InterviewInitiator.CANDIDATE,
      kind: InterviewKind.INTERNAL
    },
    comment: 'The candidate will initiate the interview by Skype.'
  }
]

describe('#getInitiatorComment', () => {
  it.each(interviews)('returns initiator comment', ({ interview, comment }) => {
    expect(getInitiatorComment(interview)).toBe(comment)
  })
})
