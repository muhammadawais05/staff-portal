/* eslint-disable import/order */
import React from 'react'
import {
  JobCommitment,
  Maybe,
  CommitmentAvailability
} from '@staff-portal/graphql/staff'
import { Typography } from '@toptal/picasso'

export type EngagementCommitment = {
  currentCommitment?: {
    availability?: CommitmentAvailability | null
  } | null
  commitment?: Maybe<string>
}

type JobCommitmentItem = JobCommitment | undefined

import { DESIRED_COMMITMENT_TITLES, DESIRED_COMMITMENT_COLORS } from '../config'

export const extractJobCommitments = ({
  currentEngagement,
  commitment
}: {
  commitment?: Maybe<string>
  currentEngagement?: EngagementCommitment | null
}) => {
  const currentCommitment =
    currentEngagement?.currentCommitment?.availability?.toUpperCase() as JobCommitmentItem
  const nextCommitment =
    currentEngagement?.commitment?.toUpperCase() as JobCommitmentItem
  const desiredCommitment = commitment?.toUpperCase() as JobCommitmentItem

  return {
    currentCommitment,
    nextCommitment,
    desiredCommitment
  }
}

export const hasScheduledChange = (
  currentCommitment?: string,
  nextCommitment?: string
) =>
  !!currentCommitment &&
  !!nextCommitment &&
  currentCommitment !== nextCommitment

export const desiredFormatCommitment = (commitment?: string | null) =>
  commitment ? (
    <Typography
      as='span'
      weight='semibold'
      color={DESIRED_COMMITMENT_COLORS[commitment]}
    >
      {DESIRED_COMMITMENT_TITLES[commitment]}
    </Typography>
  ) : null
