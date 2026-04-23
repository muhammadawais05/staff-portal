import { InterviewKind } from '@staff-portal/graphql/staff'

import { getScheduleInterviewEventTitle } from './get-schedule-interview-event-title'

const JOB_TITLE = 'Job Title'
const CLIENT_FULL_NAME = 'Client Full Name'

const arrangeTest = (kind: InterviewKind) =>
  getScheduleInterviewEventTitle({
    kind,
    jobTitle: JOB_TITLE,
    clientFullName: CLIENT_FULL_NAME
  })

describe('getScheduleInterviewEventTitle', () => {
  it('shows external interview title', () => {
    expect(arrangeTest(InterviewKind.EXTERNAL)).toBe(
      `${JOB_TITLE} at ${CLIENT_FULL_NAME}`
    )
  })

  it('shows internal interview title', () => {
    expect(arrangeTest(InterviewKind.INTERNAL)).toBe(JOB_TITLE)
  })
})
