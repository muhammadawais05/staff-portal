import { JobCandidateIntroDraftsEngagementFragment } from './data/get-candidate-intro-drafts'
import { JobEngagementEdgeFragment } from './data/job-engagement-edge-fragment/job-engagement-edge-fragment.staff.gql.types'

export type CandidateIntroDraftItem =
  JobCandidateIntroDraftsEngagementFragment & {
    jobIssues?: JobEngagementEdgeFragment['jobIssues']
  }
