import React from 'react'
import { Typography, Tooltip, Container } from '@toptal/picasso'
import { toTitleCase } from '@toptal/picasso/utils'
import {
  AvailabilityRequestExpirationReason,
  AvailabilityRequestRejectReason,
  AvailabilityRequestStatus
} from '@staff-portal/graphql/staff'

import {
  AvailabilityRequestItemFragment,
  AvailabilityRequestMetadataFragment
} from '../../data/get-availability-requests'
import {
  getStatusColor,
  getStatusTooltip,
  getFeedbackTooltip,
  getPredictionValue
} from './utils'

export interface Props {
  status: AvailabilityRequestStatus
  availabilityRequestMetadata?: AvailabilityRequestMetadataFragment | null
  expirationReason?: AvailabilityRequestExpirationReason | null
  talentComment?: AvailabilityRequestItemFragment['talentComment']
  rejectReason?: AvailabilityRequestRejectReason | null
}

const AvailabilityRequestsStatus = ({
  status,
  expirationReason,
  talentComment,
  rejectReason,
  availabilityRequestMetadata
}: Props) => {
  const statusColor = getStatusColor({ status, availabilityRequestMetadata })
  const statusTooltip = getStatusTooltip({
    availabilityRequestMetadata,
    status,
    expirationReason
  })
  const feedbackTooltip = getFeedbackTooltip({
    talentComment,
    rejectReason
  })

  return (
    <Container data-testid='availability-request-status'>
      <Typography color={statusColor} weight='semibold' as='span'>
        {toTitleCase(status.toLowerCase())}
        {status === AvailabilityRequestStatus.PENDING &&
          `(${getPredictionValue(availabilityRequestMetadata?.prediction)})`}
      </Typography>
      {statusTooltip && (
        <Tooltip interactive content={statusTooltip.content}>
          <Container
            left='xsmall'
            as='span'
            data-testid='availability-request-status-tooltip'
          >
            {statusTooltip.icon}
          </Container>
        </Tooltip>
      )}
      {feedbackTooltip && (
        <Tooltip interactive content={feedbackTooltip.content}>
          <Container
            left='xsmall'
            as='span'
            data-testid='availability-request-feedback-tooltip'
          >
            {feedbackTooltip.icon}
          </Container>
        </Tooltip>
      )}
    </Container>
  )
}

export default AvailabilityRequestsStatus
