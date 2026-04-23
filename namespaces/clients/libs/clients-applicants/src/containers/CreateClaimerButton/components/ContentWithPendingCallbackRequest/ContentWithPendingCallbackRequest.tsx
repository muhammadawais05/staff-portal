import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'
import {
  OverlappingMeetingsText,
  OutsideWorkingHoursText,
  ClaimCallRequestModalIcon
} from '@staff-portal/clients-call-requests'

import { GetCreateClaimerDetailsQuery } from '../../data'
import { getCallRequestText } from '../../services'

type Props = {
  pendingCallbackRequest: NonNullable<
    NonNullable<GetCreateClaimerDetailsQuery['node']>['pendingCallbackRequest']
  >
  question: string
  timeZoneName?: string
}

const ContentWithPendingCallbackRequest = ({
  pendingCallbackRequest,
  question,
  timeZoneName
}: Props) => {
  const formatDateTime = useUserDateTimeFormatter()
  const { type, requestedStartTime, overlappingMeetings, inWorkingHours } =
    pendingCallbackRequest

  return (
    <Container flex alignItems='center' justifyContent='space-between'>
      <Container>
        <Container bottom='medium'>
          <Typography
            size='medium'
            data-testid='content-with-pending-callback-request-question'
          >
            {question}
            <br />
            {getCallRequestText(
              type,
              formatDateTime(requestedStartTime),
              timeZoneName
            )}
          </Typography>
        </Container>
        <OverlappingMeetingsText
          type={type}
          meetings={overlappingMeetings?.nodes || []}
        />
        <OutsideWorkingHoursText
          type={type}
          inWorkingHours={Boolean(inWorkingHours)}
        />
        <Container>
          <Typography
            weight='semibold'
            size='medium'
            data-testid='content-with-pending-callback-request-message'
          >
            You will be responsible for their application.
          </Typography>
        </Container>
      </Container>
      <ClaimCallRequestModalIcon type={type} />
    </Container>
  )
}

export default ContentWithPendingCallbackRequest
