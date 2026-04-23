import React from 'react'
import {
  Typography,
  Container,
  QuestionMark16,
  Message16
} from '@toptal/picasso'
import { AvailabilityRequestStatus } from '@staff-portal/graphql/staff'

import {
  AVAILABILITY_REQUEST_STATUS_COLOR_MAPPING,
  AVAILABILITY_REQUEST_EXPIRATION_REASON_MAPPING,
  AVAILABILITY_REQUEST_REJECT_REASON_MAPPING
} from '../../config'
import { Props } from './AvailabilityRequestsStatus'

export const getStatusColor = ({
  status,
  availabilityRequestMetadata
}: Pick<Props, 'status' | 'availabilityRequestMetadata'>) => {
  if (
    status === AvailabilityRequestStatus.PENDING &&
    availabilityRequestMetadata?.lowActivity
  ) {
    return 'red'
  }

  return AVAILABILITY_REQUEST_STATUS_COLOR_MAPPING[status]
}

export const getPredictionValue = (prediction?: number | null) =>
  prediction ? `${Math.round(prediction * 100)}%` : 'N/A'

// eslint-disable-next-line complexity
export const getStatusTooltip = ({
  availabilityRequestMetadata,
  status,
  expirationReason
}: Props) => {
  if (status === AvailabilityRequestStatus.PENDING) {
    const prediction = getPredictionValue(
      availabilityRequestMetadata?.prediction
    )

    return {
      content: (
        <>
          {availabilityRequestMetadata?.lowActivity ? (
            <Typography>
              Talent has{' '}
              <Typography inline weight='semibold' as='span' color='red'>
                low-activity
              </Typography>
              , he is not likely to accept a new AR.
            </Typography>
          ) : (
            <Typography>Availability request statistics</Typography>
          )}
          <Container top='small'>
            <Typography inline weight='semibold'>
              Acceptance prediction rate:
            </Typography>{' '}
            {prediction}
            <br />
            <Typography inline weight='semibold'>
              Pending:
            </Typography>{' '}
            {availabilityRequestMetadata?.pending ?? 'N/A'}
            <br />
            <Typography inline weight='semibold'>
              Recently accepted:
            </Typography>{' '}
            {availabilityRequestMetadata?.recentConfirmed ?? 'N/A'}
            <br />
            <Typography inline weight='semibold'>
              Recently rejected:
            </Typography>{' '}
            {availabilityRequestMetadata?.recentRejected ?? 'N/A'}
          </Container>
        </>
      ),
      icon: <QuestionMark16 />
    }
  }

  if (status === AvailabilityRequestStatus.EXPIRED && expirationReason) {
    return {
      content: AVAILABILITY_REQUEST_EXPIRATION_REASON_MAPPING[expirationReason],
      icon: <QuestionMark16 />
    }
  }

  if (status === AvailabilityRequestStatus.CANCELLED) {
    return {
      content: 'Job type or specialization changed.',
      icon: <QuestionMark16 />
    }
  }
}

export const getFeedbackTooltip = ({
  talentComment,
  rejectReason
}: Pick<Props, 'rejectReason' | 'talentComment'>) => {
  if (rejectReason || talentComment) {
    return {
      content: (
        <Container>
          {rejectReason && (
            <Container bottom={talentComment ? 'small' : undefined}>
              <Typography weight='semibold'>
                {AVAILABILITY_REQUEST_REJECT_REASON_MAPPING[rejectReason]}
              </Typography>
            </Container>
          )}

          {talentComment && <Typography>{talentComment}</Typography>}
        </Container>
      ),
      icon: <Message16 />
    }
  }
}
