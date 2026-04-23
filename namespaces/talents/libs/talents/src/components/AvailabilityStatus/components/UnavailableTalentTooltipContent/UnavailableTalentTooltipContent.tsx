import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import {
  parseAndFormatDate,
  getDateDistanceFromNow
} from '@staff-portal/date-time-utils'
import { UnavailableAllocatedHoursChangeRequestFragment } from '@staff-portal/facilities'
import { NO_VALUE } from '@staff-portal/config'

import { TALENT_AVAILABILITY_STATUS_MAPPING } from '../../../../services'
import getTalentAvailability from '../../utils/get-talent-allocated-availability'
import {
  REJECT_REASON_MAPPING,
  REJECT_REASON_KEY_OTHER,
  REJECT_REASON_OTHER
} from './config'
import * as S from './styles'

const Label = ({ children }: { children: string }) => (
  <Typography as='span' weight='semibold'>
    {children}
  </Typography>
)

interface Props {
  unavailableAllocatedHoursChangeRequest: UnavailableAllocatedHoursChangeRequestFragment
  allocatedHoursConfirmedAt?: string | null
}

const UnavailableTalentTooltipContent = ({
  unavailableAllocatedHoursChangeRequest,
  allocatedHoursConfirmedAt
}: Props) => {
  const { futureCommitment, rejectReason, returnInDate, comment } =
    unavailableAllocatedHoursChangeRequest

  const rejectReasonText =
    REJECT_REASON_MAPPING[rejectReason ?? REJECT_REASON_KEY_OTHER] ??
    REJECT_REASON_OTHER

  const futureAvailability = getTalentAvailability(futureCommitment)
  const futureAvailabilityText =
    TALENT_AVAILABILITY_STATUS_MAPPING[futureAvailability]

  const confirmedAtPeriod = allocatedHoursConfirmedAt
    ? getDateDistanceFromNow(allocatedHoursConfirmedAt, {
        hideSuffix: true
      })
    : null
  const availabilityUpdatedAt = confirmedAtPeriod
    ? `Availability updated ${confirmedAtPeriod} ago`
    : null

  return (
    <Container>
      <Typography weight='semibold'>
        Talent is{' '}
        <Typography as='span' color='red' weight='semibold'>
          unavailable
        </Typography>
      </Typography>

      <Container top='xsmall'>
        <Typography>
          <Label>Reason:</Label> {rejectReasonText}
        </Typography>
      </Container>

      {comment && (
        <Container top='xsmall'>
          <Typography css={S.preserveWhitespace}>
            <Label>Comment:</Label> {comment}
          </Typography>
        </Container>
      )}

      <Container top='xsmall'>
        <Typography>
          <Label>Expected date to come back to Toptal: </Label>
          {returnInDate ? parseAndFormatDate(returnInDate) : NO_VALUE}
        </Typography>
      </Container>

      <Container top='xsmall'>
        <Typography>
          <Label>Future Commitment: </Label>
          {futureAvailabilityText}
        </Typography>
      </Container>

      {availabilityUpdatedAt && (
        <Container top='xsmall'>
          <Typography>{availabilityUpdatedAt}</Typography>
        </Container>
      )}
    </Container>
  )
}

export default UnavailableTalentTooltipContent
