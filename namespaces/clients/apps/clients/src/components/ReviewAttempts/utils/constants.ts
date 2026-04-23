import { ReviewKind } from '@staff-portal/graphql/staff'

export const translate = {
  title: 'Review Attempts',
  noAttemptsAvailable: 'Currently there are no attempts.',
  logReviewAttempt: 'Log Review Attempt',
  markAsFailed: 'Mark as Failed',
  requestTrustPilotLink: 'Request TrustPilot Link',
  startClientReview: 'Start feedback cycle',
  reset: 'Reset',
  fields: {
    date: 'Date',
    result: 'Result',
    commentary: 'Commentary'
  },
  [ReviewKind.AWAITING]: 'Success - Awaiting Review',
  [ReviewKind.LEFT_VM]: 'Left VM',
  [ReviewKind.NEGATIVE]: 'Feedback Negative',
  [ReviewKind.SUCCESS]: 'Success'
}
