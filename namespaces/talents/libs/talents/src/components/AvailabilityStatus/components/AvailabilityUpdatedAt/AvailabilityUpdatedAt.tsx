import React from 'react'
import { Container } from '@toptal/picasso'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'

import { TalentAvailabilityFragment } from '../../../../data'

interface Props {
  talentAvailability: TalentAvailabilityFragment
}

const AvailabilityUpdatedAt = ({ talentAvailability }: Props) => {
  const confirmedAtPeriod = talentAvailability.allocatedHoursConfirmedAt
    ? getDateDistanceFromNow(talentAvailability.allocatedHoursConfirmedAt, {
        hideSuffix: true
      })
    : null

  return confirmedAtPeriod ? (
    <Container data-testid='availability-updated-at' top='xsmall'>
      Availability updated {confirmedAtPeriod} ago.
    </Container>
  ) : null
}

export default AvailabilityUpdatedAt
