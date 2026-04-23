export const getScheduleInterviewDescription = (isClassic: boolean) =>
  isClassic
    ? 'Please set the date, time, and time zone of the interview. You may pick up to three options. The candidate will then be notified and will confirm the interview time from the options you choose. If the candidate cannot make the proposed times, then you will able to reschedule.'
    : 'Please set the date, time, and time zone to schedule this interview via Top Scheduler. The candidate will be notified and the interview will be instantly confirmed. If the candidate cannot make the proposed time, then you will able to reschedule.'
