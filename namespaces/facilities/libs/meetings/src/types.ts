import { MeetingFragment } from './data/meeting-fragment'
import { MeetingPendingJobsFragment } from './data/meeting-pending-jobs-fragment'

export type MeetingWithJobs = MeetingFragment & MeetingPendingJobsFragment
