import { NO_VALUE } from '@staff-portal/config'
import { Job } from '@staff-portal/graphql/staff'
import { DESIRED_COMMITMENT_TITLES } from '@staff-portal/jobs'
import { ENGAGEMENT_COMMITMENT_MAPPING } from '@staff-portal/engagements'

export const isEngagementCommitment = (job: Job) =>
  job.currentEngagement?.commitment &&
  job.talentCount === 1 &&
  (!job.commitment ||
    ENGAGEMENT_COMMITMENT_MAPPING[job.currentEngagement.commitment] !==
      DESIRED_COMMITMENT_TITLES[job.commitment])

export const renderCommitment = (job: Job) =>
  job.currentEngagement?.commitment && isEngagementCommitment(job)
    ? ENGAGEMENT_COMMITMENT_MAPPING[job.currentEngagement.commitment]
    : job.commitment
    ? DESIRED_COMMITMENT_TITLES[job.commitment] || NO_VALUE
    : NO_VALUE
