import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { getRoleTypeText } from '@staff-portal/facilities'

import { getFutureAvailability } from '../../../../utils'
import { TalentAvailabilityFragment } from '../../../../data'

interface Props {
  talentAvailability: TalentAvailabilityFragment
  includeType?: boolean
}

const FutureAvailabilityLabel = ({
  talentAvailability,
  includeType = false
}: Props) => {
  const {
    availableHours,
    allocatedHours,
    availabilityStatus,
    futureAvailabilityDistanceToNow,
    color
  } = getFutureAvailability(talentAvailability)

  const roleType = includeType
    ? getRoleTypeText(talentAvailability.type)
    : 'Talent'

  return (
    <Container data-testid='future-availability-label' as='span' inline>
      {roleType} will be available{' '}
      <Typography as='span' color={color} weight='semibold' size='inherit'>
        {availabilityStatus} {availableHours}/{allocatedHours} hrs
      </Typography>
      {futureAvailabilityDistanceToNow
        ? ` in ${futureAvailabilityDistanceToNow}`
        : ''}
      .
    </Container>
  )
}

export default FutureAvailabilityLabel
