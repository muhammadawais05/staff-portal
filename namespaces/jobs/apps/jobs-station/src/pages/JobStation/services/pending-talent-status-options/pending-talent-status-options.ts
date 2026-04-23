import { PendingTalentStatus } from '@staff-portal/graphql/staff'

import { JobAggregatedPendingTalentStatusesFragment } from '../../data/get-jobs-list'

export const pendingTalentStatusOptions = (
  statusCounters: JobAggregatedPendingTalentStatusesFragment
) => [
  {
    label: `Talent not sent (${statusCounters.talentNotSent})`,
    value: PendingTalentStatus.TALENT_NOT_SENT.toLocaleLowerCase()
  },
  {
    label: `Pending review (${statusCounters.pendingReview})`,
    value: PendingTalentStatus.PENDING_REVIEW.toLocaleLowerCase()
  },
  {
    label: `No talent in review (${statusCounters.noTalentInReview})`,
    value: PendingTalentStatus.NO_TALENT_IN_REVIEW.toLocaleLowerCase()
  },
  {
    label: `Interview not scheduled (${statusCounters.interviewNotScheduled})`,
    value: PendingTalentStatus.INTERVIEW_NOT_SCHEDULED.toLocaleLowerCase()
  },
  {
    label: `Interview time confirmed (${statusCounters.interviewConfirmed})`,
    value: PendingTalentStatus.INTERVIEW_CONFIRMED.toLocaleLowerCase()
  },
  {
    label: `Interview time rejected (${statusCounters.interviewRejected})`,
    value: PendingTalentStatus.INTERVIEW_REJECTED.toLocaleLowerCase()
  },
  {
    label: `Interview occurred (${statusCounters.interviewOccurred})`,
    value: PendingTalentStatus.INTERVIEW_OCCURRED.toLocaleLowerCase()
  },
  {
    label: `Interview not occurred (${statusCounters.interviewNotOccurred})`,
    value: PendingTalentStatus.INTERVIEW_NOT_OCCURRED.toLocaleLowerCase()
  },
  {
    label: `Rejected during interview (${statusCounters.rejectPriorInterview})`,
    value: PendingTalentStatus.REJECT_PRIOR_INTERVIEW.toLocaleLowerCase()
  },
  {
    label: `Accepted (${statusCounters.accepted})`,
    value: PendingTalentStatus.ACCEPTED.toLocaleLowerCase()
  },
  {
    label: `Pending expiration (${statusCounters.pendingExpiration})`,
    value: PendingTalentStatus.PENDING_EXPIRATION.toLocaleLowerCase()
  },
  {
    label: `Expiration postponed (${statusCounters.expirationPostponed})`,
    value: PendingTalentStatus.EXPIRATION_POSTPONED.toLocaleLowerCase()
  },
  {
    label: `Expired (${statusCounters.expired})`,
    value: PendingTalentStatus.EXPIRED.toLocaleLowerCase()
  },
  {
    label: `Cancelled (${statusCounters.cancelled})`,
    value: PendingTalentStatus.CANCELLED.toLocaleLowerCase()
  },
  {
    label: `Rejected trial (${statusCounters.rejectedTrial})`,
    value: PendingTalentStatus.REJECTED_TRIAL.toLocaleLowerCase()
  },
  {
    label: `Missed (${statusCounters.missed})`,
    value: PendingTalentStatus.MISSED.toLocaleLowerCase()
  }
]
