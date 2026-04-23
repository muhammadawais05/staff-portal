import { Maybe } from 'graphql/jsutils/Maybe'
import {
  JobCommitment,
  JobStatus,
  EngagementCommitmentEnum,
  CommitmentAvailability
} from '@staff-portal/graphql/staff'

import { DESIRED_COMMITMENT_TITLES, COMMITMENT_COLORS } from '../config'

type CurrentEngagement = {
  id: string
  commitment: EngagementCommitmentEnum
  currentCommitment?: Maybe<{
    availability: Maybe<CommitmentAvailability>
  }>
}

export const getCommitmentTitle = (commitment: Maybe<string>) => {
  const key = commitment?.toLowerCase()

  return (key && DESIRED_COMMITMENT_TITLES[key]) ?? 'Not Specified'
}

export const getCommitmentColor = (commitment: Maybe<string>) => {
  const key = commitment?.toUpperCase()

  return (key && COMMITMENT_COLORS[key as JobCommitment]) || 'black'
}

export const shouldRenderCommitment = ({
  talentCount,
  jobStatus,
  currentEngagement
}: {
  talentCount: Maybe<number> | undefined
  jobStatus: Maybe<JobStatus> | undefined
  currentEngagement: Maybe<CurrentEngagement | undefined>
}) =>
  talentCount === 1 &&
  jobStatus === JobStatus.ACTIVE &&
  Boolean(currentEngagement)
