import { InterviewCumulativeStatus } from '@staff-portal/graphql/staff'

type InterviewWithStatus = {
  cumulativeStatus: InterviewCumulativeStatus
}

export default (interview: InterviewWithStatus) => {
  switch (interview.cumulativeStatus) {
    case InterviewCumulativeStatus.TIME_REJECTED:
    case InterviewCumulativeStatus.MISSED:
    case InterviewCumulativeStatus.REJECTED:
    case InterviewCumulativeStatus.NOT_OCCURRED:
    case InterviewCumulativeStatus.NOT_OCCURRED_VERIFIED_BY_STAFF:
      return 'red'
    case InterviewCumulativeStatus.SCHEDULED:
    case InterviewCumulativeStatus.PENDING:
      return 'yellow'
    case InterviewCumulativeStatus.TIME_ACCEPTED:
    case InterviewCumulativeStatus.ACCEPTED:
    case InterviewCumulativeStatus.OCCURRED:
    case InterviewCumulativeStatus.OCCURRED_VERIFIED_BY_STAFF:
      return 'green'
  }
}
