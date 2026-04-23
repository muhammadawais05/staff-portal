import { getScheduleInterviewDescription } from './get-schedule-interview-description'

describe('getScheduleInterviewDescription', () => {
  it('shows classic scheduling description', () => {
    expect(getScheduleInterviewDescription(true)).toBe(
      'Please set the date, time, and time zone of the interview. You may pick up to three options. The candidate will then be notified and will confirm the interview time from the options you choose. If the candidate cannot make the proposed times, then you will able to reschedule.'
    )
  })

  it('shows TopScheduler description', () => {
    expect(getScheduleInterviewDescription(false)).toBe(
      'Please set the date, time, and time zone to schedule this interview via Top Scheduler. The candidate will be notified and the interview will be instantly confirmed. If the candidate cannot make the proposed time, then you will able to reschedule.'
    )
  })
})
