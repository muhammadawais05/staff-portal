import React from 'react'
import {
  CommitmentAvailability,
  EngagementCommitmentEnum
} from '@staff-portal/graphql/staff'
import { ColoredStatus } from '@staff-portal/ui'
import pluralize from 'pluralize'

import {
  ENGAGEMENT_COMMITMENT_COLOR_MAPPING,
  ENGAGEMENT_COMMITMENT_MAPPING,
  COMMITMENT_AVAILABILITY_MAPPING
} from '../../config'

interface Props {
  commitment: EngagementCommitmentEnum
  commitmentAvailability?: CommitmentAvailability
  commitmentHours?: number | null
}

const getStatus = (
  scheduledChange: boolean,
  next: EngagementCommitmentEnum,
  current?: CommitmentAvailability,
  hours?: number | null
) => {
  if (hours && ENGAGEMENT_COMMITMENT_MAPPING[next] == 'Hourly') {
    return (
      ENGAGEMENT_COMMITMENT_MAPPING[next] +
      ` (${pluralize('hour', hours, true)})`
    )
  }

  return current && scheduledChange
    ? `${COMMITMENT_AVAILABILITY_MAPPING[current]} (scheduled change to ${ENGAGEMENT_COMMITMENT_MAPPING[next]})`
    : ENGAGEMENT_COMMITMENT_MAPPING[next]
}

const EngagementCommitment = ({
  commitment,
  commitmentAvailability,
  commitmentHours
}: Props) => {
  const scheduledChange =
    !!commitmentAvailability &&
    commitmentAvailability.toLowerCase() !== commitment.toLowerCase()

  return (
    <ColoredStatus
      status={getStatus(
        scheduledChange,
        commitment,
        commitmentAvailability,
        commitmentHours
      )}
      color={ENGAGEMENT_COMMITMENT_COLOR_MAPPING[commitment]}
      size='medium'
    />
  )
}

export default EngagementCommitment
