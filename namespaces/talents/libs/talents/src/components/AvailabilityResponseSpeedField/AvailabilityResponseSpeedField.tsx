import React from 'react'
import { ColorType, Typography } from '@toptal/picasso'
import { TalentAvailabilityResponseSpeed } from '@staff-portal/graphql/staff'

type Props = {
  responseSpeed?: TalentAvailabilityResponseSpeed | null
}

const RESPONSE_SPEED_MAP: Record<
  TalentAvailabilityResponseSpeed,
  { label: string; color: ColorType }
> = {
  [TalentAvailabilityResponseSpeed.FAST]: {
    label: 'Fast (0 - 12 hrs)',
    color: 'green'
  },
  [TalentAvailabilityResponseSpeed.MODERATE]: {
    label: 'Moderate (12 - 36 hrs)',
    color: 'yellow'
  },
  [TalentAvailabilityResponseSpeed.SLOW]: {
    label: 'Slow (36+ hrs)',
    color: 'red'
  },
  [TalentAvailabilityResponseSpeed.NOT_AVAILABLE]: {
    label: 'N/A',
    color: 'light-grey'
  }
}

const AvailabilityResponseSpeedField = ({ responseSpeed }: Props) => {
  if (!responseSpeed) {
    return null
  }

  const speed = RESPONSE_SPEED_MAP[responseSpeed]

  return (
    <Typography weight='semibold' color={speed.color}>
      {speed.label}
    </Typography>
  )
}

export default AvailabilityResponseSpeedField
